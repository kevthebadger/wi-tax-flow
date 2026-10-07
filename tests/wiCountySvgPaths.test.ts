import { describe, it, expect } from 'vitest';
import { WI_COUNTY_PATHS, WI_COUNTY_PATHS_ARRAY } from '../src/data/wiCountySvgPaths';
import { WI_COUNTIES } from '../src/data/wiTaxData';

interface Point {
  x: number;
  y: number;
}

interface BoundingBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}

function parseSvgPathSubpolygons(d: string): Point[][] {
  const subpathRegex = /M[^Z]+Z/gi;
  const subpathStrings = d.match(subpathRegex) || [d];
  const subpolygons: Point[][] = [];

  for (const sub of subpathStrings) {
    const points: Point[] = [];
    const regex = /([MLml])\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(sub)) !== null) {
      const x = parseFloat(match[2]);
      const y = parseFloat(match[3]);
      if (!Number.isNaN(x) && !Number.isNaN(y)) {
        points.push({ x, y });
      }
    }
    if (points.length > 0) {
      subpolygons.push(points);
    }
  }

  return subpolygons;
}

function parseSvgPathCoordinates(d: string): Point[] {
  const subpolys = parseSvgPathSubpolygons(d);
  return subpolys.flat();
}

function isPointInMultiPolygon(p: Point, polygons: Point[][]): boolean {
  for (const polygon of polygons) {
    if (isPointInPolygon(p, polygon)) {
      return true;
    }
  }
  return false;
}

function computeBoundingBox(points: Point[]): BoundingBox {
  if (points.length === 0) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 };
  }
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

function isPointInPolygon(p: Point, polygon: Point[]): boolean {
  let inside = false;
  const n = polygon.length;
  if (n < 3) return false;

  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const intersect =
      yi > p.y !== yj > p.y &&
      p.x < ((xj - xi) * (p.y - yi)) / (yj - yi) + xi;
    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}

function polygonArea(points: Point[]): number {
  let area = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    area += points[i].x * points[j].y;
    area -= points[j].x * points[i].y;
  }
  return Math.abs(area) / 2.0;
}

describe('wiCountySvgPaths Invariant & Fuzzing Suite (Milestone 2 Challenger)', () => {
  describe('Dimension 1: County Inventory, Counts & 1:1 Bi-directional Parity', () => {
    it('PATH-1: contains exactly 72 entries in WI_COUNTY_PATHS dictionary', () => {
      const keys = Object.keys(WI_COUNTY_PATHS);
      expect(keys.length).toBe(72);
    });

    it('PATH-2: contains exactly 72 items in WI_COUNTY_PATHS_ARRAY', () => {
      expect(Array.isArray(WI_COUNTY_PATHS_ARRAY)).toBe(true);
      expect(WI_COUNTY_PATHS_ARRAY.length).toBe(72);
    });

    it('PATH-3: dictionary keys strictly match county.fips for all records', () => {
      for (const [key, county] of Object.entries(WI_COUNTY_PATHS)) {
        expect(key).toBe(county.fips);
      }
    });

    it('PATH-4: 100% 1:1 bi-directional bijection with WI_COUNTIES from wiTaxData', () => {
      const taxDataFipsSet = new Set(WI_COUNTIES.map((c) => c.fips));
      const svgPathsFipsSet = new Set(WI_COUNTY_PATHS_ARRAY.map((c) => c.fips));

      expect(taxDataFipsSet.size).toBe(72);
      expect(svgPathsFipsSet.size).toBe(72);

      for (const fips of taxDataFipsSet) {
        expect(svgPathsFipsSet.has(fips)).toBe(true);
      }

      for (const fips of svgPathsFipsSet) {
        expect(taxDataFipsSet.has(fips)).toBe(true);
      }

      for (const taxCounty of WI_COUNTIES) {
        const svgCounty = WI_COUNTY_PATHS[taxCounty.fips];
        expect(svgCounty).toBeDefined();
        expect(svgCounty.name).toBe(taxCounty.name);
      }
    });
  });

  describe('Dimension 2: FIPS Code Integrity & Menominee Validation', () => {
    it('PATH-5: every FIPS code starts with 55 and is exactly 5 characters long', () => {
      for (const county of WI_COUNTY_PATHS_ARRAY) {
        expect(county.fips).toMatch(/^55\d{3}$/);
        expect(county.fips.length).toBe(5);
        expect(county.fips.startsWith('55')).toBe(true);
      }
    });

    it('PATH-6: no duplicate FIPS codes exist', () => {
      const seenFips = new Set<string>();
      for (const county of WI_COUNTY_PATHS_ARRAY) {
        expect(seenFips.has(county.fips)).toBe(false);
        seenFips.add(county.fips);
      }
      expect(seenFips.size).toBe(72);
    });

    it('PATH-7: no duplicate county names exist', () => {
      const seenNames = new Set<string>();
      for (const county of WI_COUNTY_PATHS_ARRAY) {
        expect(seenNames.has(county.name)).toBe(false);
        seenNames.add(county.name);
      }
      expect(seenNames.size).toBe(72);
    });

    it('PATH-8: Menominee County FIPS 55078 is present, valid, and populated', () => {
      const menominee = WI_COUNTY_PATHS['55078'];
      expect(menominee).toBeDefined();
      expect(menominee.fips).toBe('55078');
      expect(menominee.name).toBe('Menominee');
      expect(menominee.path.length).toBeGreaterThan(20);
      expect(menominee.path.startsWith('M')).toBe(true);
      expect(menominee.path.endsWith('Z')).toBe(true);
      expect(menominee.centroid).toBeDefined();
      expect(menominee.centroid.length).toBe(2);
    });
  });

  describe('Dimension 3: SVG Path Syntax & Structure', () => {
    it('PATH-9: all SVG path strings start with M, end with Z, and are non-empty', () => {
      for (const county of WI_COUNTY_PATHS_ARRAY) {
        expect(typeof county.path).toBe('string');
        const trimmed = county.path.trim();
        expect(trimmed.length).toBeGreaterThan(0);
        expect(trimmed.startsWith('M')).toBe(true);
        expect(trimmed.endsWith('Z')).toBe(true);
      }
    });

    it('PATH-10: all SVG paths parse into at least 3 distinct coordinate points', () => {
      for (const county of WI_COUNTY_PATHS_ARRAY) {
        const points = parseSvgPathCoordinates(county.path);
        expect(points.length).toBeGreaterThanOrEqual(3);
      }
    });

    it('PATH-11: path string contains only valid SVG syntax without malicious characters', () => {
      const validSvgPathRegex = /^[MLZmlz0-9,.\s\-]+$/;
      for (const county of WI_COUNTY_PATHS_ARRAY) {
        expect(county.path).toMatch(validSvgPathRegex);
      }
    });
  });

  describe('Dimension 4: ViewBox Bounding Box Conformance (0 0 600 650)', () => {
    const VIEWBOX_MAX_X = 600.0;
    const VIEWBOX_MAX_Y = 650.0;

    it('PATH-12: every coordinate vertex in every county fits strictly within [0, 600] x [0, 650]', () => {
      const violations: { county: string; point: Point }[] = [];

      for (const county of WI_COUNTY_PATHS_ARRAY) {
        const points = parseSvgPathCoordinates(county.path);
        for (const p of points) {
          if (p.x < 0 || p.x > VIEWBOX_MAX_X || p.y < 0 || p.y > VIEWBOX_MAX_Y) {
            violations.push({ county: county.name, point: p });
          }
        }
      }

      expect(violations).toEqual([]);
    });

    it('PATH-13: statewide aggregate bounding box strictly fits inside viewBox', () => {
      const allPoints: Point[] = [];
      for (const county of WI_COUNTY_PATHS_ARRAY) {
        const points = parseSvgPathCoordinates(county.path);
        allPoints.push(...points);
      }

      const stateBbox = computeBoundingBox(allPoints);

      expect(stateBbox.minX).toBeGreaterThanOrEqual(0);
      expect(stateBbox.maxX).toBeLessThanOrEqual(VIEWBOX_MAX_X);
      expect(stateBbox.minY).toBeGreaterThanOrEqual(0);
      expect(stateBbox.maxY).toBeLessThanOrEqual(VIEWBOX_MAX_Y);
      expect(stateBbox.width).toBeGreaterThan(400);
      expect(stateBbox.height).toBeGreaterThan(450);
    });

    it('PATH-14: each county has positive width and height (> 5px)', () => {
      for (const county of WI_COUNTY_PATHS_ARRAY) {
        const points = parseSvgPathCoordinates(county.path);
        const bbox = computeBoundingBox(points);
        expect(bbox.width).toBeGreaterThan(5);
        expect(bbox.height).toBeGreaterThan(5);
      }
    });
  });

  describe('Dimension 5: Centroid Verification & Point-in-Polygon Tests', () => {
    it('PATH-15: Pepin County (55091) centroid [115.0, 355.0] is inside its bounding box and landmass', () => {
      const pepin = WI_COUNTY_PATHS['55091'];
      expect(pepin).toBeDefined();
      expect(pepin.name).toBe('Pepin');
      expect(pepin.centroid).toEqual([115.0, 355.0]);

      const points = parseSvgPathCoordinates(pepin.path);
      const bbox = computeBoundingBox(points);
      const [cx, cy] = pepin.centroid;

      // Inside bounding box
      expect(cx).toBeGreaterThan(bbox.minX);
      expect(cx).toBeLessThan(bbox.maxX);
      expect(cy).toBeGreaterThan(bbox.minY);
      expect(cy).toBeLessThan(bbox.maxY);

      // Inside polygon landmass (ray-casting point-in-polygon)
      const inside = isPointInPolygon({ x: cx, y: cy }, points);
      expect(inside).toBe(true);
    });

    it('PATH-16: all 72 county centroids lie strictly within their respective bounding boxes', () => {
      const violations: string[] = [];

      for (const county of WI_COUNTY_PATHS_ARRAY) {
        const [cx, cy] = county.centroid;
        const points = parseSvgPathCoordinates(county.path);
        const bbox = computeBoundingBox(points);

        if (cx < bbox.minX || cx > bbox.maxX || cy < bbox.minY || cy > bbox.maxY) {
          violations.push(`${county.name} (${county.fips}): [${cx}, ${cy}] not in bbox`);
        }
      }

      expect(violations).toEqual([]);
    });

    it('PATH-17: all 72 county centroids lie inside their respective polygon landmasses', () => {
      const outsideList: string[] = [];

      for (const county of WI_COUNTY_PATHS_ARRAY) {
        const [cx, cy] = county.centroid;
        const subpolys = parseSvgPathSubpolygons(county.path);
        const inside = isPointInMultiPolygon({ x: cx, y: cy }, subpolys);

        if (!inside) {
          outsideList.push(`${county.name} (${county.fips}): [${cx}, ${cy}]`);
        }
      }

      expect(outsideList).toEqual([]);
    });
  });

  describe('Dimension 6: Polygon Geometric Non-Degeneracy & Area', () => {
    it('PATH-18: every county polygon has non-trivial positive area (> 20 px²)', () => {
      for (const county of WI_COUNTY_PATHS_ARRAY) {
        const points = parseSvgPathCoordinates(county.path);
        const area = polygonArea(points);
        expect(area).toBeGreaterThan(20);
      }
    });

    it('PATH-19: sum of all 72 county polygon areas is plausible for Wisconsin geometry', () => {
      let totalArea = 0;
      for (const county of WI_COUNTY_PATHS_ARRAY) {
        const points = parseSvgPathCoordinates(county.path);
        totalArea += polygonArea(points);
      }

      expect(totalArea).toBeGreaterThan(100000);
      expect(totalArea).toBeLessThan(350000);
    });
  });

  describe('Dimension 7: Adversarial Edge Cases & Key Counties Stress Test', () => {
    it('PATH-20: paths have balanced M and Z delimiters and no NaN/null tokens', () => {
      for (const county of WI_COUNTY_PATHS_ARRAY) {
        const mMatches = county.path.match(/M/g) || [];
        const zMatches = county.path.match(/Z/g) || [];
        expect(mMatches.length).toBeGreaterThanOrEqual(1);
        expect(zMatches.length).toBeGreaterThanOrEqual(1);
        expect(mMatches.length).toBe(zMatches.length);

        expect(county.path).not.toContain('NaN');
        expect(county.path).not.toContain('Infinity');
        expect(county.path).not.toContain('undefined');
        expect(county.path).not.toContain('null');
      }
    });

    it('PATH-21: verifies Milwaukee, Dane, and Door Counties feature detailed geometries', () => {
      const milwaukee = WI_COUNTY_PATHS['55079'];
      const dane = WI_COUNTY_PATHS['55025'];
      const door = WI_COUNTY_PATHS['55029'];

      expect(milwaukee).toBeDefined();
      expect(milwaukee.name).toBe('Milwaukee');
      expect(milwaukee.path.length).toBeGreaterThan(50);

      expect(dane).toBeDefined();
      expect(dane.name).toBe('Dane');
      expect(dane.path.length).toBeGreaterThan(50);

      expect(door).toBeDefined();
      expect(door.name).toBe('Door');
      const doorPoints = parseSvgPathCoordinates(door.path);
      expect(doorPoints.length).toBeGreaterThan(10);
    });
  });
});
