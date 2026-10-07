import type {
  CountyRecord,
  StatewideSummary,
  AgencyCitation
} from '../types/taxFlow';

/**
 * Complete authoritative dataset of all 72 Wisconsin counties.
 * Covers Net Individual Income Tax and 5% State Sales Tax vs.
 * Shared Revenue (Pre/Post Act 12), DPI General School Aids,
 * WisDOT GTA, and School Levy Tax Credits.
 */
export const WI_COUNTIES: CountyRecord[] = [
  {
    fips: "55001",
    name: "Adams",
    seat: "Friendship",
    population: 21135,
    preAct12: {
      taxes: {
        individualIncomeTax: 21000000,
        stateSalesTax: 16500000,
        totalTaxes: 37500000
      },
      aids: {
        sharedRevenue: 3200000,
        schoolAids: 37500000,
        transportationAids: 4800000,
        schoolLevyTaxCredit: 5400000,
        totalAids: 50900000
      },
      metrics: {
        returnOnDollar: 1.357333,
        returnCents: 135.73,
        netFlow: 13400000,
        netFlowPerCapita: 634.02,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 21000000,
        stateSalesTax: 16500000,
        totalTaxes: 37500000
      },
      aids: {
        sharedRevenue: 3900000,
        schoolAids: 37500000,
        transportationAids: 4800000,
        schoolLevyTaxCredit: 5400000,
        totalAids: 51600000
      },
      metrics: {
        returnOnDollar: 1.376,
        returnCents: 137.6,
        netFlow: 14100000,
        netFlowPerCapita: 667.14,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55003",
    name: "Ashland",
    seat: "Ashland",
    population: 16027,
    preAct12: {
      taxes: {
        individualIncomeTax: 13520000,
        stateSalesTax: 14830000,
        totalTaxes: 28350000
      },
      aids: {
        sharedRevenue: 1830000,
        schoolAids: 22280000,
        transportationAids: 2310000,
        schoolLevyTaxCredit: 2260000,
        totalAids: 28680000
      },
      metrics: {
        returnOnDollar: 1.01164,
        returnCents: 101.16,
        netFlow: 330000,
        netFlowPerCapita: 20.59,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 13520000,
        stateSalesTax: 14830000,
        totalTaxes: 28350000
      },
      aids: {
        sharedRevenue: 3630000,
        schoolAids: 22280000,
        transportationAids: 2310000,
        schoolLevyTaxCredit: 2260000,
        totalAids: 30480000
      },
      metrics: {
        returnOnDollar: 1.075132,
        returnCents: 107.51,
        netFlow: 2130000,
        netFlowPerCapita: 132.9,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55005",
    name: "Barron",
    seat: "Barron",
    population: 46711,
    preAct12: {
      taxes: {
        individualIncomeTax: 45200000,
        stateSalesTax: 47430000,
        totalTaxes: 92630000
      },
      aids: {
        sharedRevenue: 5050000,
        schoolAids: 53330000,
        transportationAids: 5500000,
        schoolLevyTaxCredit: 6810000,
        totalAids: 70690000
      },
      metrics: {
        returnOnDollar: 0.763144,
        returnCents: 76.31,
        netFlow: -21940000,
        netFlowPerCapita: -469.7,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 45200000,
        stateSalesTax: 47430000,
        totalTaxes: 92630000
      },
      aids: {
        sharedRevenue: 7970000,
        schoolAids: 53330000,
        transportationAids: 5500000,
        schoolLevyTaxCredit: 6810000,
        totalAids: 73610000
      },
      metrics: {
        returnOnDollar: 0.794667,
        returnCents: 79.47,
        netFlow: -19020000,
        netFlowPerCapita: -407.18,
        classification: "donor"
      }
    }
  },
  {
    fips: "55007",
    name: "Bayfield",
    seat: "Washburn",
    population: 16220,
    preAct12: {
      taxes: {
        individualIncomeTax: 15090000,
        stateSalesTax: 17390000,
        totalTaxes: 32480000
      },
      aids: {
        sharedRevenue: 1780000,
        schoolAids: 17710000,
        transportationAids: 2550000,
        schoolLevyTaxCredit: 2530000,
        totalAids: 24570000
      },
      metrics: {
        returnOnDollar: 0.756466,
        returnCents: 75.65,
        netFlow: -7910000,
        netFlowPerCapita: -487.67,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 15090000,
        stateSalesTax: 17390000,
        totalTaxes: 32480000
      },
      aids: {
        sharedRevenue: 3530000,
        schoolAids: 17710000,
        transportationAids: 2550000,
        schoolLevyTaxCredit: 2530000,
        totalAids: 26320000
      },
      metrics: {
        returnOnDollar: 0.810345,
        returnCents: 81.03,
        netFlow: -6160000,
        netFlowPerCapita: -379.78,
        classification: "donor"
      }
    }
  },
  {
    fips: "55009",
    name: "Brown",
    seat: "Green Bay",
    population: 268740,
    preAct12: {
      taxes: {
        individualIncomeTax: 410000000,
        stateSalesTax: 320000000,
        totalTaxes: 730000000
      },
      aids: {
        sharedRevenue: 34000000,
        schoolAids: 255000000,
        transportationAids: 24500000,
        schoolLevyTaxCredit: 52000000,
        totalAids: 365500000
      },
      metrics: {
        returnOnDollar: 0.500685,
        returnCents: 50.07,
        netFlow: -364500000,
        netFlowPerCapita: -1356.33,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 410000000,
        stateSalesTax: 320000000,
        totalTaxes: 730000000
      },
      aids: {
        sharedRevenue: 41500000,
        schoolAids: 255000000,
        transportationAids: 24500000,
        schoolLevyTaxCredit: 52000000,
        totalAids: 373000000
      },
      metrics: {
        returnOnDollar: 0.510959,
        returnCents: 51.1,
        netFlow: -357000000,
        netFlowPerCapita: -1328.42,
        classification: "donor"
      }
    }
  },
  {
    fips: "55011",
    name: "Buffalo",
    seat: "Alma",
    population: 13317,
    preAct12: {
      taxes: {
        individualIncomeTax: 11900000,
        stateSalesTax: 10520000,
        totalTaxes: 22420000
      },
      aids: {
        sharedRevenue: 1490000,
        schoolAids: 17190000,
        transportationAids: 2030000,
        schoolLevyTaxCredit: 1980000,
        totalAids: 22690000
      },
      metrics: {
        returnOnDollar: 1.012043,
        returnCents: 101.2,
        netFlow: 270000,
        netFlowPerCapita: 20.27,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 11900000,
        stateSalesTax: 10520000,
        totalTaxes: 22420000
      },
      aids: {
        sharedRevenue: 2960000,
        schoolAids: 17190000,
        transportationAids: 2030000,
        schoolLevyTaxCredit: 1980000,
        totalAids: 24160000
      },
      metrics: {
        returnOnDollar: 1.077609,
        returnCents: 107.76,
        netFlow: 1740000,
        netFlowPerCapita: 130.66,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55013",
    name: "Burnett",
    seat: "Siren",
    population: 16526,
    preAct12: {
      taxes: {
        individualIncomeTax: 14350000,
        stateSalesTax: 15850000,
        totalTaxes: 30200000
      },
      aids: {
        sharedRevenue: 1860000,
        schoolAids: 20510000,
        transportationAids: 2670000,
        schoolLevyTaxCredit: 2700000,
        totalAids: 27740000
      },
      metrics: {
        returnOnDollar: 0.918543,
        returnCents: 91.85,
        netFlow: -2460000,
        netFlowPerCapita: -148.86,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 14350000,
        stateSalesTax: 15850000,
        totalTaxes: 30200000
      },
      aids: {
        sharedRevenue: 3690000,
        schoolAids: 20510000,
        transportationAids: 2670000,
        schoolLevyTaxCredit: 2700000,
        totalAids: 29570000
      },
      metrics: {
        returnOnDollar: 0.979139,
        returnCents: 97.91,
        netFlow: -630000,
        netFlowPerCapita: -38.12,
        classification: "donor"
      }
    }
  },
  {
    fips: "55015",
    name: "Calumet",
    seat: "Chilton",
    population: 52442,
    preAct12: {
      taxes: {
        individualIncomeTax: 84580000,
        stateSalesTax: 47340000,
        totalTaxes: 131920000
      },
      aids: {
        sharedRevenue: 4110000,
        schoolAids: 44260000,
        transportationAids: 4120000,
        schoolLevyTaxCredit: 9360000,
        totalAids: 61850000
      },
      metrics: {
        returnOnDollar: 0.468845,
        returnCents: 46.88,
        netFlow: -70070000,
        netFlowPerCapita: -1336.14,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 84580000,
        stateSalesTax: 47340000,
        totalTaxes: 131920000
      },
      aids: {
        sharedRevenue: 6490000,
        schoolAids: 44260000,
        transportationAids: 4120000,
        schoolLevyTaxCredit: 9360000,
        totalAids: 64230000
      },
      metrics: {
        returnOnDollar: 0.486886,
        returnCents: 48.69,
        netFlow: -67690000,
        netFlowPerCapita: -1290.76,
        classification: "donor"
      }
    }
  },
  {
    fips: "55017",
    name: "Chippewa",
    seat: "Chippewa Falls",
    population: 66297,
    preAct12: {
      taxes: {
        individualIncomeTax: 74020000,
        stateSalesTax: 65830000,
        totalTaxes: 139850000
      },
      aids: {
        sharedRevenue: 6720000,
        schoolAids: 71090000,
        transportationAids: 7230000,
        schoolLevyTaxCredit: 9860000,
        totalAids: 94900000
      },
      metrics: {
        returnOnDollar: 0.678584,
        returnCents: 67.86,
        netFlow: -44950000,
        netFlowPerCapita: -678.01,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 74020000,
        stateSalesTax: 65830000,
        totalTaxes: 139850000
      },
      aids: {
        sharedRevenue: 10610000,
        schoolAids: 71090000,
        transportationAids: 7230000,
        schoolLevyTaxCredit: 9860000,
        totalAids: 98790000
      },
      metrics: {
        returnOnDollar: 0.7064,
        returnCents: 70.64,
        netFlow: -41060000,
        netFlowPerCapita: -619.33,
        classification: "donor"
      }
    }
  },
  {
    fips: "55019",
    name: "Clark",
    seat: "Neillsville",
    population: 34659,
    preAct12: {
      taxes: {
        individualIncomeTax: 26660000,
        stateSalesTax: 25420000,
        totalTaxes: 52080000
      },
      aids: {
        sharedRevenue: 4070000,
        schoolAids: 50930000,
        transportationAids: 5440000,
        schoolLevyTaxCredit: 4900000,
        totalAids: 65340000
      },
      metrics: {
        returnOnDollar: 1.254608,
        returnCents: 125.46,
        netFlow: 13260000,
        netFlowPerCapita: 382.58,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 26660000,
        stateSalesTax: 25420000,
        totalTaxes: 52080000
      },
      aids: {
        sharedRevenue: 7130000,
        schoolAids: 50930000,
        transportationAids: 5440000,
        schoolLevyTaxCredit: 4900000,
        totalAids: 68400000
      },
      metrics: {
        returnOnDollar: 1.313364,
        returnCents: 131.34,
        netFlow: 16320000,
        netFlowPerCapita: 470.87,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55021",
    name: "Columbia",
    seat: "Portage",
    population: 58490,
    preAct12: {
      taxes: {
        individualIncomeTax: 68930000,
        stateSalesTax: 60720000,
        totalTaxes: 129650000
      },
      aids: {
        sharedRevenue: 5760000,
        schoolAids: 56910000,
        transportationAids: 6120000,
        schoolLevyTaxCredit: 9130000,
        totalAids: 77920000
      },
      metrics: {
        returnOnDollar: 0.601003,
        returnCents: 60.1,
        netFlow: -51730000,
        netFlowPerCapita: -884.42,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 68930000,
        stateSalesTax: 60720000,
        totalTaxes: 129650000
      },
      aids: {
        sharedRevenue: 9090000,
        schoolAids: 56910000,
        transportationAids: 6120000,
        schoolLevyTaxCredit: 9130000,
        totalAids: 81250000
      },
      metrics: {
        returnOnDollar: 0.626687,
        returnCents: 62.67,
        netFlow: -48400000,
        netFlowPerCapita: -827.49,
        classification: "donor"
      }
    }
  },
  {
    fips: "55023",
    name: "Crawford",
    seat: "Prairie du Chien",
    population: 16113,
    preAct12: {
      taxes: {
        individualIncomeTax: 13590000,
        stateSalesTax: 14180000,
        totalTaxes: 27770000
      },
      aids: {
        sharedRevenue: 1840000,
        schoolAids: 21600000,
        transportationAids: 2320000,
        schoolLevyTaxCredit: 2200000,
        totalAids: 27960000
      },
      metrics: {
        returnOnDollar: 1.006842,
        returnCents: 100.68,
        netFlow: 190000,
        netFlowPerCapita: 11.79,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 13590000,
        stateSalesTax: 14180000,
        totalTaxes: 27770000
      },
      aids: {
        sharedRevenue: 3650000,
        schoolAids: 21600000,
        transportationAids: 2320000,
        schoolLevyTaxCredit: 2200000,
        totalAids: 29770000
      },
      metrics: {
        returnOnDollar: 1.07202,
        returnCents: 107.2,
        netFlow: 2000000,
        netFlowPerCapita: 124.12,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55025",
    name: "Dane",
    seat: "Madison",
    population: 561504,
    preAct12: {
      taxes: {
        individualIncomeTax: 1550000000,
        stateSalesTax: 720000000,
        totalTaxes: 2270000000
      },
      aids: {
        sharedRevenue: 38000000,
        schoolAids: 310000000,
        transportationAids: 36000000,
        schoolLevyTaxCredit: 140000000,
        totalAids: 524000000
      },
      metrics: {
        returnOnDollar: 0.230837,
        returnCents: 23.08,
        netFlow: -1746000000,
        netFlowPerCapita: -3109.51,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 1550000000,
        stateSalesTax: 720000000,
        totalTaxes: 2270000000
      },
      aids: {
        sharedRevenue: 46200000,
        schoolAids: 310000000,
        transportationAids: 36000000,
        schoolLevyTaxCredit: 140000000,
        totalAids: 532200000
      },
      metrics: {
        returnOnDollar: 0.234449,
        returnCents: 23.44,
        netFlow: -1737800000,
        netFlowPerCapita: -3094.9,
        classification: "donor"
      }
    }
  },
  {
    fips: "55027",
    name: "Dodge",
    seat: "Juneau",
    population: 89396,
    preAct12: {
      taxes: {
        individualIncomeTax: 97600000,
        stateSalesTax: 82710000,
        totalTaxes: 180310000
      },
      aids: {
        sharedRevenue: 9160000,
        schoolAids: 93190000,
        transportationAids: 8970000,
        schoolLevyTaxCredit: 13030000,
        totalAids: 124350000
      },
      metrics: {
        returnOnDollar: 0.689646,
        returnCents: 68.96,
        netFlow: -55960000,
        netFlowPerCapita: -625.98,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 97600000,
        stateSalesTax: 82710000,
        totalTaxes: 180310000
      },
      aids: {
        sharedRevenue: 13190000,
        schoolAids: 93190000,
        transportationAids: 8970000,
        schoolLevyTaxCredit: 13030000,
        totalAids: 128380000
      },
      metrics: {
        returnOnDollar: 0.711996,
        returnCents: 71.2,
        netFlow: -51930000,
        netFlowPerCapita: -580.9,
        classification: "donor"
      }
    }
  },
  {
    fips: "55029",
    name: "Door",
    seat: "Sturgeon Bay",
    population: 30066,
    preAct12: {
      taxes: {
        individualIncomeTax: 39160000,
        stateSalesTax: 49190000,
        totalTaxes: 88350000
      },
      aids: {
        sharedRevenue: 2790000,
        schoolAids: 17910000,
        transportationAids: 3670000,
        schoolLevyTaxCredit: 6030000,
        totalAids: 30400000
      },
      metrics: {
        returnOnDollar: 0.344086,
        returnCents: 34.41,
        netFlow: -57950000,
        netFlowPerCapita: -1927.43,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 39160000,
        stateSalesTax: 49190000,
        totalTaxes: 88350000
      },
      aids: {
        sharedRevenue: 4890000,
        schoolAids: 17910000,
        transportationAids: 3670000,
        schoolLevyTaxCredit: 6030000,
        totalAids: 32500000
      },
      metrics: {
        returnOnDollar: 0.367855,
        returnCents: 36.79,
        netFlow: -55850000,
        netFlowPerCapita: -1857.58,
        classification: "donor"
      }
    }
  },
  {
    fips: "55031",
    name: "Douglas",
    seat: "Superior",
    population: 44295,
    preAct12: {
      taxes: {
        individualIncomeTax: 45060000,
        stateSalesTax: 47480000,
        totalTaxes: 92540000
      },
      aids: {
        sharedRevenue: 4690000,
        schoolAids: 51890000,
        transportationAids: 5020000,
        schoolLevyTaxCredit: 6060000,
        totalAids: 67660000
      },
      metrics: {
        returnOnDollar: 0.731143,
        returnCents: 73.11,
        netFlow: -24880000,
        netFlowPerCapita: -561.69,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 45060000,
        stateSalesTax: 47480000,
        totalTaxes: 92540000
      },
      aids: {
        sharedRevenue: 7400000,
        schoolAids: 51890000,
        transportationAids: 5020000,
        schoolLevyTaxCredit: 6060000,
        totalAids: 70370000
      },
      metrics: {
        returnOnDollar: 0.760428,
        returnCents: 76.04,
        netFlow: -22170000,
        netFlowPerCapita: -500.51,
        classification: "donor"
      }
    }
  },
  {
    fips: "55033",
    name: "Dunn",
    seat: "Menomonie",
    population: 45440,
    preAct12: {
      taxes: {
        individualIncomeTax: 45100000,
        stateSalesTax: 43580000,
        totalTaxes: 88680000
      },
      aids: {
        sharedRevenue: 4860000,
        schoolAids: 54140000,
        transportationAids: 4960000,
        schoolLevyTaxCredit: 6420000,
        totalAids: 70380000
      },
      metrics: {
        returnOnDollar: 0.79364,
        returnCents: 79.36,
        netFlow: -18300000,
        netFlowPerCapita: -402.73,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 45100000,
        stateSalesTax: 43580000,
        totalTaxes: 88680000
      },
      aids: {
        sharedRevenue: 7670000,
        schoolAids: 54140000,
        transportationAids: 4960000,
        schoolLevyTaxCredit: 6420000,
        totalAids: 73190000
      },
      metrics: {
        returnOnDollar: 0.825327,
        returnCents: 82.53,
        netFlow: -15490000,
        netFlowPerCapita: -340.89,
        classification: "donor"
      }
    }
  },
  {
    fips: "55035",
    name: "Eau Claire",
    seat: "Eau Claire",
    population: 105714,
    preAct12: {
      taxes: {
        individualIncomeTax: 125900000,
        stateSalesTax: 133590000,
        totalTaxes: 259490000
      },
      aids: {
        sharedRevenue: 10350000,
        schoolAids: 107050000,
        transportationAids: 8760000,
        schoolLevyTaxCredit: 15400000,
        totalAids: 141560000
      },
      metrics: {
        returnOnDollar: 0.545532,
        returnCents: 54.55,
        netFlow: -117930000,
        netFlowPerCapita: -1115.56,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 125900000,
        stateSalesTax: 133590000,
        totalTaxes: 259490000
      },
      aids: {
        sharedRevenue: 14900000,
        schoolAids: 107050000,
        transportationAids: 8760000,
        schoolLevyTaxCredit: 15400000,
        totalAids: 146110000
      },
      metrics: {
        returnOnDollar: 0.563066,
        returnCents: 56.31,
        netFlow: -113380000,
        netFlowPerCapita: -1072.52,
        classification: "donor"
      }
    }
  },
  {
    fips: "55037",
    name: "Florence",
    seat: "Florence",
    population: 4558,
    preAct12: {
      taxes: {
        individualIncomeTax: 3680000,
        stateSalesTax: 3090000,
        totalTaxes: 6770000
      },
      aids: {
        sharedRevenue: 530000,
        schoolAids: 5790000,
        transportationAids: 840000,
        schoolLevyTaxCredit: 610000,
        totalAids: 7770000
      },
      metrics: {
        returnOnDollar: 1.14771,
        returnCents: 114.77,
        netFlow: 1000000,
        netFlowPerCapita: 219.39,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 3680000,
        stateSalesTax: 3090000,
        totalTaxes: 6770000
      },
      aids: {
        sharedRevenue: 1050000,
        schoolAids: 5790000,
        transportationAids: 840000,
        schoolLevyTaxCredit: 610000,
        totalAids: 8290000
      },
      metrics: {
        returnOnDollar: 1.22452,
        returnCents: 122.45,
        netFlow: 1520000,
        netFlowPerCapita: 333.48,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55039",
    name: "Fond du Lac",
    seat: "Fond du Lac",
    population: 104154,
    preAct12: {
      taxes: {
        individualIncomeTax: 118880000,
        stateSalesTax: 111640000,
        totalTaxes: 230520000
      },
      aids: {
        sharedRevenue: 10430000,
        schoolAids: 108580000,
        transportationAids: 9540000,
        schoolLevyTaxCredit: 14870000,
        totalAids: 143420000
      },
      metrics: {
        returnOnDollar: 0.622159,
        returnCents: 62.22,
        netFlow: -87100000,
        netFlowPerCapita: -836.26,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 118880000,
        stateSalesTax: 111640000,
        totalTaxes: 230520000
      },
      aids: {
        sharedRevenue: 15020000,
        schoolAids: 108580000,
        transportationAids: 9540000,
        schoolLevyTaxCredit: 14870000,
        totalAids: 148010000
      },
      metrics: {
        returnOnDollar: 0.64207,
        returnCents: 64.21,
        netFlow: -82510000,
        netFlowPerCapita: -792.19,
        classification: "donor"
      }
    }
  },
  {
    fips: "55041",
    name: "Forest",
    seat: "Crandon",
    population: 9179,
    preAct12: {
      taxes: {
        individualIncomeTax: 6830000,
        stateSalesTax: 6730000,
        totalTaxes: 13560000
      },
      aids: {
        sharedRevenue: 1090000,
        schoolAids: 14130000,
        transportationAids: 1640000,
        schoolLevyTaxCredit: 1160000,
        totalAids: 18020000
      },
      metrics: {
        returnOnDollar: 1.328909,
        returnCents: 132.89,
        netFlow: 4460000,
        netFlowPerCapita: 485.89,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 6830000,
        stateSalesTax: 6730000,
        totalTaxes: 13560000
      },
      aids: {
        sharedRevenue: 2160000,
        schoolAids: 14130000,
        transportationAids: 1640000,
        schoolLevyTaxCredit: 1160000,
        totalAids: 19090000
      },
      metrics: {
        returnOnDollar: 1.407817,
        returnCents: 140.78,
        netFlow: 5530000,
        netFlowPerCapita: 602.46,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55043",
    name: "Grant",
    seat: "Lancaster",
    population: 51938,
    preAct12: {
      taxes: {
        individualIncomeTax: 47680000,
        stateSalesTax: 45710000,
        totalTaxes: 93390000
      },
      aids: {
        sharedRevenue: 5740000,
        schoolAids: 67040000,
        transportationAids: 7020000,
        schoolLevyTaxCredit: 7100000,
        totalAids: 86900000
      },
      metrics: {
        returnOnDollar: 0.930506,
        returnCents: 93.05,
        netFlow: -6490000,
        netFlowPerCapita: -124.96,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 47680000,
        stateSalesTax: 45710000,
        totalTaxes: 93390000
      },
      aids: {
        sharedRevenue: 9060000,
        schoolAids: 67040000,
        transportationAids: 7020000,
        schoolLevyTaxCredit: 7100000,
        totalAids: 90220000
      },
      metrics: {
        returnOnDollar: 0.966056,
        returnCents: 96.61,
        netFlow: -3170000,
        netFlowPerCapita: -61.03,
        classification: "donor"
      }
    }
  },
  {
    fips: "55045",
    name: "Green",
    seat: "Monroe",
    population: 36968,
    preAct12: {
      taxes: {
        individualIncomeTax: 43110000,
        stateSalesTax: 35040000,
        totalTaxes: 78150000
      },
      aids: {
        sharedRevenue: 3660000,
        schoolAids: 36700000,
        transportationAids: 3870000,
        schoolLevyTaxCredit: 5610000,
        totalAids: 49840000
      },
      metrics: {
        returnOnDollar: 0.637748,
        returnCents: 63.77,
        netFlow: -28310000,
        netFlowPerCapita: -765.8,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 43110000,
        stateSalesTax: 35040000,
        totalTaxes: 78150000
      },
      aids: {
        sharedRevenue: 6410000,
        schoolAids: 36700000,
        transportationAids: 3870000,
        schoolLevyTaxCredit: 5610000,
        totalAids: 52590000
      },
      metrics: {
        returnOnDollar: 0.672937,
        returnCents: 67.29,
        netFlow: -25560000,
        netFlowPerCapita: -691.41,
        classification: "donor"
      }
    }
  },
  {
    fips: "55047",
    name: "Green Lake",
    seat: "Green Lake",
    population: 19018,
    preAct12: {
      taxes: {
        individualIncomeTax: 18400000,
        stateSalesTax: 17600000,
        totalTaxes: 36000000
      },
      aids: {
        sharedRevenue: 2060000,
        schoolAids: 21710000,
        transportationAids: 2320000,
        schoolLevyTaxCredit: 3110000,
        totalAids: 29200000
      },
      metrics: {
        returnOnDollar: 0.811111,
        returnCents: 81.11,
        netFlow: -6800000,
        netFlowPerCapita: -357.56,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 18400000,
        stateSalesTax: 17600000,
        totalTaxes: 36000000
      },
      aids: {
        sharedRevenue: 4090000,
        schoolAids: 21710000,
        transportationAids: 2320000,
        schoolLevyTaxCredit: 3110000,
        totalAids: 31230000
      },
      metrics: {
        returnOnDollar: 0.8675,
        returnCents: 86.75,
        netFlow: -4770000,
        netFlowPerCapita: -250.82,
        classification: "donor"
      }
    }
  },
  {
    fips: "55049",
    name: "Iowa",
    seat: "Dodgeville",
    population: 23709,
    preAct12: {
      taxes: {
        individualIncomeTax: 27060000,
        stateSalesTax: 23010000,
        totalTaxes: 50070000
      },
      aids: {
        sharedRevenue: 2370000,
        schoolAids: 24010000,
        transportationAids: 2790000,
        schoolLevyTaxCredit: 3520000,
        totalAids: 32690000
      },
      metrics: {
        returnOnDollar: 0.652886,
        returnCents: 65.29,
        netFlow: -17380000,
        netFlowPerCapita: -733.05,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 27060000,
        stateSalesTax: 23010000,
        totalTaxes: 50070000
      },
      aids: {
        sharedRevenue: 4150000,
        schoolAids: 24010000,
        transportationAids: 2790000,
        schoolLevyTaxCredit: 3520000,
        totalAids: 34470000
      },
      metrics: {
        returnOnDollar: 0.688436,
        returnCents: 68.84,
        netFlow: -15600000,
        netFlowPerCapita: -657.98,
        classification: "donor"
      }
    }
  },
  {
    fips: "55051",
    name: "Iron",
    seat: "Hurley",
    population: 6137,
    preAct12: {
      taxes: {
        individualIncomeTax: 4870000,
        stateSalesTax: 4990000,
        totalTaxes: 9860000
      },
      aids: {
        sharedRevenue: 710000,
        schoolAids: 7620000,
        transportationAids: 1150000,
        schoolLevyTaxCredit: 870000,
        totalAids: 10350000
      },
      metrics: {
        returnOnDollar: 1.049696,
        returnCents: 104.97,
        netFlow: 490000,
        netFlowPerCapita: 79.84,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 4870000,
        stateSalesTax: 4990000,
        totalTaxes: 9860000
      },
      aids: {
        sharedRevenue: 1410000,
        schoolAids: 7620000,
        transportationAids: 1150000,
        schoolLevyTaxCredit: 870000,
        totalAids: 11050000
      },
      metrics: {
        returnOnDollar: 1.12069,
        returnCents: 112.07,
        netFlow: 1190000,
        netFlowPerCapita: 193.91,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55053",
    name: "Jackson",
    seat: "Black River Falls",
    population: 21145,
    preAct12: {
      taxes: {
        individualIncomeTax: 18360000,
        stateSalesTax: 19090000,
        totalTaxes: 37450000
      },
      aids: {
        sharedRevenue: 2380000,
        schoolAids: 27710000,
        transportationAids: 2950000,
        schoolLevyTaxCredit: 2830000,
        totalAids: 35870000
      },
      metrics: {
        returnOnDollar: 0.95781,
        returnCents: 95.78,
        netFlow: -1580000,
        netFlowPerCapita: -74.72,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 18360000,
        stateSalesTax: 19090000,
        totalTaxes: 37450000
      },
      aids: {
        sharedRevenue: 4170000,
        schoolAids: 27710000,
        transportationAids: 2950000,
        schoolLevyTaxCredit: 2830000,
        totalAids: 37660000
      },
      metrics: {
        returnOnDollar: 1.005607,
        returnCents: 100.56,
        netFlow: 210000,
        netFlowPerCapita: 9.93,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55055",
    name: "Jefferson",
    seat: "Jefferson",
    population: 84900,
    preAct12: {
      taxes: {
        individualIncomeTax: 100060000,
        stateSalesTax: 84300000,
        totalTaxes: 184360000
      },
      aids: {
        sharedRevenue: 8360000,
        schoolAids: 84290000,
        transportationAids: 8000000,
        schoolLevyTaxCredit: 13130000,
        totalAids: 113780000
      },
      metrics: {
        returnOnDollar: 0.617162,
        returnCents: 61.72,
        netFlow: -70580000,
        netFlowPerCapita: -831.33,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 100060000,
        stateSalesTax: 84300000,
        totalTaxes: 184360000
      },
      aids: {
        sharedRevenue: 12040000,
        schoolAids: 84290000,
        transportationAids: 8000000,
        schoolLevyTaxCredit: 13130000,
        totalAids: 117460000
      },
      metrics: {
        returnOnDollar: 0.637123,
        returnCents: 63.71,
        netFlow: -66900000,
        netFlowPerCapita: -787.99,
        classification: "donor"
      }
    }
  },
  {
    fips: "55057",
    name: "Juneau",
    seat: "Mauston",
    population: 26718,
    preAct12: {
      taxes: {
        individualIncomeTax: 22210000,
        stateSalesTax: 22910000,
        totalTaxes: 45120000
      },
      aids: {
        sharedRevenue: 3060000,
        schoolAids: 36610000,
        transportationAids: 3610000,
        schoolLevyTaxCredit: 3650000,
        totalAids: 46930000
      },
      metrics: {
        returnOnDollar: 1.040115,
        returnCents: 104.01,
        netFlow: 1810000,
        netFlowPerCapita: 67.74,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 22210000,
        stateSalesTax: 22910000,
        totalTaxes: 45120000
      },
      aids: {
        sharedRevenue: 5360000,
        schoolAids: 36610000,
        transportationAids: 3610000,
        schoolLevyTaxCredit: 3650000,
        totalAids: 49230000
      },
      metrics: {
        returnOnDollar: 1.09109,
        returnCents: 109.11,
        netFlow: 4110000,
        netFlowPerCapita: 153.83,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55059",
    name: "Kenosha",
    seat: "Kenosha",
    population: 169151,
    preAct12: {
      taxes: {
        individualIncomeTax: 205650000,
        stateSalesTax: 179400000,
        totalTaxes: 385050000
      },
      aids: {
        sharedRevenue: 16360000,
        schoolAids: 184730000,
        transportationAids: 12540000,
        schoolLevyTaxCredit: 26410000,
        totalAids: 240040000
      },
      metrics: {
        returnOnDollar: 0.6234,
        returnCents: 62.34,
        netFlow: -145010000,
        netFlowPerCapita: -857.28,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 205650000,
        stateSalesTax: 179400000,
        totalTaxes: 385050000
      },
      aids: {
        sharedRevenue: 21660000,
        schoolAids: 184730000,
        transportationAids: 12540000,
        schoolLevyTaxCredit: 26410000,
        totalAids: 245340000
      },
      metrics: {
        returnOnDollar: 0.637164,
        returnCents: 63.72,
        netFlow: -139710000,
        netFlowPerCapita: -825.95,
        classification: "donor"
      }
    }
  },
  {
    fips: "55061",
    name: "Kewaunee",
    seat: "Kewaunee",
    population: 20563,
    preAct12: {
      taxes: {
        individualIncomeTax: 21430000,
        stateSalesTax: 16710000,
        totalTaxes: 38140000
      },
      aids: {
        sharedRevenue: 2150000,
        schoolAids: 22870000,
        transportationAids: 2600000,
        schoolLevyTaxCredit: 3000000,
        totalAids: 30620000
      },
      metrics: {
        returnOnDollar: 0.802832,
        returnCents: 80.28,
        netFlow: -7520000,
        netFlowPerCapita: -365.71,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 21430000,
        stateSalesTax: 16710000,
        totalTaxes: 38140000
      },
      aids: {
        sharedRevenue: 3770000,
        schoolAids: 22870000,
        transportationAids: 2600000,
        schoolLevyTaxCredit: 3000000,
        totalAids: 32240000
      },
      metrics: {
        returnOnDollar: 0.845307,
        returnCents: 84.53,
        netFlow: -5900000,
        netFlowPerCapita: -286.92,
        classification: "donor"
      }
    }
  },
  {
    fips: "55063",
    name: "La Crosse",
    seat: "La Crosse",
    population: 120784,
    preAct12: {
      taxes: {
        individualIncomeTax: 145350000,
        stateSalesTax: 156730000,
        totalTaxes: 302080000
      },
      aids: {
        sharedRevenue: 11750000,
        schoolAids: 117520000,
        transportationAids: 9690000,
        schoolLevyTaxCredit: 17060000,
        totalAids: 156020000
      },
      metrics: {
        returnOnDollar: 0.516486,
        returnCents: 51.65,
        netFlow: -146060000,
        netFlowPerCapita: -1209.27,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 145350000,
        stateSalesTax: 156730000,
        totalTaxes: 302080000
      },
      aids: {
        sharedRevenue: 16920000,
        schoolAids: 117520000,
        transportationAids: 9690000,
        schoolLevyTaxCredit: 17060000,
        totalAids: 161190000
      },
      metrics: {
        returnOnDollar: 0.5336,
        returnCents: 53.36,
        netFlow: -140890000,
        netFlowPerCapita: -1166.46,
        classification: "donor"
      }
    }
  },
  {
    fips: "55065",
    name: "Lafayette",
    seat: "Darlington",
    population: 16611,
    preAct12: {
      taxes: {
        individualIncomeTax: 14840000,
        stateSalesTax: 12180000,
        totalTaxes: 27020000
      },
      aids: {
        sharedRevenue: 1850000,
        schoolAids: 22100000,
        transportationAids: 2460000,
        schoolLevyTaxCredit: 2370000,
        totalAids: 28780000
      },
      metrics: {
        returnOnDollar: 1.065137,
        returnCents: 106.51,
        netFlow: 1760000,
        netFlowPerCapita: 105.95,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 14840000,
        stateSalesTax: 12180000,
        totalTaxes: 27020000
      },
      aids: {
        sharedRevenue: 3670000,
        schoolAids: 22100000,
        transportationAids: 2460000,
        schoolLevyTaxCredit: 2370000,
        totalAids: 30600000
      },
      metrics: {
        returnOnDollar: 1.132494,
        returnCents: 113.25,
        netFlow: 3580000,
        netFlowPerCapita: 215.52,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55067",
    name: "Langlade",
    seat: "Antigo",
    population: 19491,
    preAct12: {
      taxes: {
        individualIncomeTax: 15960000,
        stateSalesTax: 17590000,
        totalTaxes: 33550000
      },
      aids: {
        sharedRevenue: 2240000,
        schoolAids: 27090000,
        transportationAids: 2720000,
        schoolLevyTaxCredit: 2610000,
        totalAids: 34660000
      },
      metrics: {
        returnOnDollar: 1.033085,
        returnCents: 103.31,
        netFlow: 1110000,
        netFlowPerCapita: 56.95,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 15960000,
        stateSalesTax: 17590000,
        totalTaxes: 33550000
      },
      aids: {
        sharedRevenue: 4440000,
        schoolAids: 27090000,
        transportationAids: 2720000,
        schoolLevyTaxCredit: 2610000,
        totalAids: 36860000
      },
      metrics: {
        returnOnDollar: 1.098659,
        returnCents: 109.87,
        netFlow: 3310000,
        netFlowPerCapita: 169.82,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55069",
    name: "Lincoln",
    seat: "Merrill",
    population: 28415,
    preAct12: {
      taxes: {
        individualIncomeTax: 26790000,
        stateSalesTax: 25650000,
        totalTaxes: 52440000
      },
      aids: {
        sharedRevenue: 3110000,
        schoolAids: 34420000,
        transportationAids: 3590000,
        schoolLevyTaxCredit: 3890000,
        totalAids: 45010000
      },
      metrics: {
        returnOnDollar: 0.858314,
        returnCents: 85.83,
        netFlow: -7430000,
        netFlowPerCapita: -261.48,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 26790000,
        stateSalesTax: 25650000,
        totalTaxes: 52440000
      },
      aids: {
        sharedRevenue: 5450000,
        schoolAids: 34420000,
        transportationAids: 3590000,
        schoolLevyTaxCredit: 3890000,
        totalAids: 47350000
      },
      metrics: {
        returnOnDollar: 0.902937,
        returnCents: 90.29,
        netFlow: -5090000,
        netFlowPerCapita: -179.13,
        classification: "donor"
      }
    }
  },
  {
    fips: "55071",
    name: "Manitowoc",
    seat: "Manitowoc",
    population: 81330,
    preAct12: {
      taxes: {
        individualIncomeTax: 88790000,
        stateSalesTax: 78920000,
        totalTaxes: 167710000
      },
      aids: {
        sharedRevenue: 8330000,
        schoolAids: 87210000,
        transportationAids: 7810000,
        schoolLevyTaxCredit: 11490000,
        totalAids: 114840000
      },
      metrics: {
        returnOnDollar: 0.684753,
        returnCents: 68.48,
        netFlow: -52870000,
        netFlowPerCapita: -650.07,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 88790000,
        stateSalesTax: 78920000,
        totalTaxes: 167710000
      },
      aids: {
        sharedRevenue: 11990000,
        schoolAids: 87210000,
        transportationAids: 7810000,
        schoolLevyTaxCredit: 11490000,
        totalAids: 118500000
      },
      metrics: {
        returnOnDollar: 0.706577,
        returnCents: 70.66,
        netFlow: -49210000,
        netFlowPerCapita: -605.07,
        classification: "donor"
      }
    }
  },
  {
    fips: "55073",
    name: "Marathon",
    seat: "Wausau",
    population: 138013,
    preAct12: {
      taxes: {
        individualIncomeTax: 167790000,
        stateSalesTax: 158840000,
        totalTaxes: 326630000
      },
      aids: {
        sharedRevenue: 13350000,
        schoolAids: 142500000,
        transportationAids: 12640000,
        schoolLevyTaxCredit: 20110000,
        totalAids: 188600000
      },
      metrics: {
        returnOnDollar: 0.577412,
        returnCents: 57.74,
        netFlow: -138030000,
        netFlowPerCapita: -1000.12,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 167790000,
        stateSalesTax: 158840000,
        totalTaxes: 326630000
      },
      aids: {
        sharedRevenue: 19220000,
        schoolAids: 142500000,
        transportationAids: 12640000,
        schoolLevyTaxCredit: 20110000,
        totalAids: 194470000
      },
      metrics: {
        returnOnDollar: 0.595383,
        returnCents: 59.54,
        netFlow: -132160000,
        netFlowPerCapita: -957.59,
        classification: "donor"
      }
    }
  },
  {
    fips: "55075",
    name: "Marinette",
    seat: "Marinette",
    population: 41872,
    preAct12: {
      taxes: {
        individualIncomeTax: 37400000,
        stateSalesTax: 41580000,
        totalTaxes: 78980000
      },
      aids: {
        sharedRevenue: 4670000,
        schoolAids: 54040000,
        transportationAids: 5480000,
        schoolLevyTaxCredit: 5600000,
        totalAids: 69790000
      },
      metrics: {
        returnOnDollar: 0.883641,
        returnCents: 88.36,
        netFlow: -9190000,
        netFlowPerCapita: -219.48,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 37400000,
        stateSalesTax: 41580000,
        totalTaxes: 78980000
      },
      aids: {
        sharedRevenue: 7370000,
        schoolAids: 54040000,
        transportationAids: 5480000,
        schoolLevyTaxCredit: 5600000,
        totalAids: 72490000
      },
      metrics: {
        returnOnDollar: 0.917827,
        returnCents: 91.78,
        netFlow: -6490000,
        netFlowPerCapita: -155.0,
        classification: "donor"
      }
    }
  },
  {
    fips: "55077",
    name: "Marquette",
    seat: "Montello",
    population: 15592,
    preAct12: {
      taxes: {
        individualIncomeTax: 12770000,
        stateSalesTax: 13020000,
        totalTaxes: 25790000
      },
      aids: {
        sharedRevenue: 1790000,
        schoolAids: 21050000,
        transportationAids: 2240000,
        schoolLevyTaxCredit: 2200000,
        totalAids: 27280000
      },
      metrics: {
        returnOnDollar: 1.057774,
        returnCents: 105.78,
        netFlow: 1490000,
        netFlowPerCapita: 95.56,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 12770000,
        stateSalesTax: 13020000,
        totalTaxes: 25790000
      },
      aids: {
        sharedRevenue: 3550000,
        schoolAids: 21050000,
        transportationAids: 2240000,
        schoolLevyTaxCredit: 2200000,
        totalAids: 29040000
      },
      metrics: {
        returnOnDollar: 1.126018,
        returnCents: 112.6,
        netFlow: 3250000,
        netFlowPerCapita: 208.44,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55078",
    name: "Menominee",
    seat: "Keshena",
    population: 4255,
    preAct12: {
      taxes: {
        individualIncomeTax: 3200000,
        stateSalesTax: 1500000,
        totalTaxes: 4700000
      },
      aids: {
        sharedRevenue: 1400000,
        schoolAids: 7800000,
        transportationAids: 650000,
        schoolLevyTaxCredit: 380000,
        totalAids: 10230000
      },
      metrics: {
        returnOnDollar: 2.176596,
        returnCents: 217.66,
        netFlow: 5530000,
        netFlowPerCapita: 1299.65,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 3200000,
        stateSalesTax: 1500000,
        totalTaxes: 4700000
      },
      aids: {
        sharedRevenue: 1750000,
        schoolAids: 7800000,
        transportationAids: 650000,
        schoolLevyTaxCredit: 380000,
        totalAids: 10580000
      },
      metrics: {
        returnOnDollar: 2.251064,
        returnCents: 225.11,
        netFlow: 5880000,
        netFlowPerCapita: 1381.9,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55079",
    name: "Milwaukee",
    seat: "Milwaukee",
    population: 939489,
    preAct12: {
      taxes: {
        individualIncomeTax: 1280000000,
        stateSalesTax: 1120000000,
        totalTaxes: 2400000000
      },
      aids: {
        sharedRevenue: 290000000,
        schoolAids: 720000000,
        transportationAids: 72000000,
        schoolLevyTaxCredit: 155000000,
        totalAids: 1237000000
      },
      metrics: {
        returnOnDollar: 0.515417,
        returnCents: 51.54,
        netFlow: -1163000000,
        netFlowPerCapita: -1237.91,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 1280000000,
        stateSalesTax: 1120000000,
        totalTaxes: 2400000000
      },
      aids: {
        sharedRevenue: 350000000,
        schoolAids: 720000000,
        transportationAids: 72000000,
        schoolLevyTaxCredit: 155000000,
        totalAids: 1297000000
      },
      metrics: {
        returnOnDollar: 0.540417,
        returnCents: 54.04,
        netFlow: -1103000000,
        netFlowPerCapita: -1174.04,
        classification: "donor"
      }
    }
  },
  {
    fips: "55081",
    name: "Monroe",
    seat: "Sparta",
    population: 46274,
    preAct12: {
      taxes: {
        individualIncomeTax: 44780000,
        stateSalesTax: 43860000,
        totalTaxes: 88640000
      },
      aids: {
        sharedRevenue: 5010000,
        schoolAids: 55130000,
        transportationAids: 5450000,
        schoolLevyTaxCredit: 6330000,
        totalAids: 71920000
      },
      metrics: {
        returnOnDollar: 0.811372,
        returnCents: 81.14,
        netFlow: -16720000,
        netFlowPerCapita: -361.33,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 44780000,
        stateSalesTax: 43860000,
        totalTaxes: 88640000
      },
      aids: {
        sharedRevenue: 7910000,
        schoolAids: 55130000,
        transportationAids: 5450000,
        schoolLevyTaxCredit: 6330000,
        totalAids: 74820000
      },
      metrics: {
        returnOnDollar: 0.844088,
        returnCents: 84.41,
        netFlow: -13820000,
        netFlowPerCapita: -298.66,
        classification: "donor"
      }
    }
  },
  {
    fips: "55083",
    name: "Oconto",
    seat: "Oconto",
    population: 38965,
    preAct12: {
      taxes: {
        individualIncomeTax: 39640000,
        stateSalesTax: 32970000,
        totalTaxes: 72610000
      },
      aids: {
        sharedRevenue: 4130000,
        schoolAids: 45650000,
        transportationAids: 4930000,
        schoolLevyTaxCredit: 5680000,
        totalAids: 60390000
      },
      metrics: {
        returnOnDollar: 0.831704,
        returnCents: 83.17,
        netFlow: -12220000,
        netFlowPerCapita: -313.61,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 39640000,
        stateSalesTax: 32970000,
        totalTaxes: 72610000
      },
      aids: {
        sharedRevenue: 7240000,
        schoolAids: 45650000,
        transportationAids: 4930000,
        schoolLevyTaxCredit: 5680000,
        totalAids: 63500000
      },
      metrics: {
        returnOnDollar: 0.874535,
        returnCents: 87.45,
        netFlow: -9110000,
        netFlowPerCapita: -233.8,
        classification: "donor"
      }
    }
  },
  {
    fips: "55085",
    name: "Oneida",
    seat: "Rhinelander",
    population: 37845,
    preAct12: {
      taxes: {
        individualIncomeTax: 39910000,
        stateSalesTax: 53380000,
        totalTaxes: 93290000
      },
      aids: {
        sharedRevenue: 3940000,
        schoolAids: 34570000,
        transportationAids: 4620000,
        schoolLevyTaxCredit: 6470000,
        totalAids: 49600000
      },
      metrics: {
        returnOnDollar: 0.531675,
        returnCents: 53.17,
        netFlow: -43690000,
        netFlowPerCapita: -1154.45,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 39910000,
        stateSalesTax: 53380000,
        totalTaxes: 93290000
      },
      aids: {
        sharedRevenue: 6900000,
        schoolAids: 34570000,
        transportationAids: 4620000,
        schoolLevyTaxCredit: 6470000,
        totalAids: 52560000
      },
      metrics: {
        returnOnDollar: 0.563404,
        returnCents: 56.34,
        netFlow: -40730000,
        netFlowPerCapita: -1076.23,
        classification: "donor"
      }
    }
  },
  {
    fips: "55087",
    name: "Outagamie",
    seat: "Appleton",
    population: 190705,
    preAct12: {
      taxes: {
        individualIncomeTax: 248420000,
        stateSalesTax: 236690000,
        totalTaxes: 485110000
      },
      aids: {
        sharedRevenue: 17680000,
        schoolAids: 181760000,
        transportationAids: 15310000,
        schoolLevyTaxCredit: 28920000,
        totalAids: 243670000
      },
      metrics: {
        returnOnDollar: 0.502298,
        returnCents: 50.23,
        netFlow: -241440000,
        netFlowPerCapita: -1266.04,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 248420000,
        stateSalesTax: 236690000,
        totalTaxes: 485110000
      },
      aids: {
        sharedRevenue: 23410000,
        schoolAids: 181760000,
        transportationAids: 15310000,
        schoolLevyTaxCredit: 28920000,
        totalAids: 249400000
      },
      metrics: {
        returnOnDollar: 0.51411,
        returnCents: 51.41,
        netFlow: -235710000,
        netFlowPerCapita: -1235.99,
        classification: "donor"
      }
    }
  },
  {
    fips: "55089",
    name: "Ozaukee",
    seat: "Port Washington",
    population: 91503,
    preAct12: {
      taxes: {
        individualIncomeTax: 255410000,
        stateSalesTax: 105310000,
        totalTaxes: 360720000
      },
      aids: {
        sharedRevenue: 6120000,
        schoolAids: 39970000,
        transportationAids: 7580000,
        schoolLevyTaxCredit: 26530000,
        totalAids: 80200000
      },
      metrics: {
        returnOnDollar: 0.222333,
        returnCents: 22.23,
        netFlow: -280520000,
        netFlowPerCapita: -3065.69,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 255410000,
        stateSalesTax: 105310000,
        totalTaxes: 360720000
      },
      aids: {
        sharedRevenue: 8810000,
        schoolAids: 39970000,
        transportationAids: 7580000,
        schoolLevyTaxCredit: 26530000,
        totalAids: 82890000
      },
      metrics: {
        returnOnDollar: 0.22979,
        returnCents: 22.98,
        netFlow: -277830000,
        netFlowPerCapita: -3036.29,
        classification: "donor"
      }
    }
  },
  {
    fips: "55091",
    name: "Pepin",
    seat: "Durand",
    population: 7318,
    preAct12: {
      taxes: {
        individualIncomeTax: 6720000,
        stateSalesTax: 5780000,
        totalTaxes: 12500000
      },
      aids: {
        sharedRevenue: 810000,
        schoolAids: 9590000,
        transportationAids: 1090000,
        schoolLevyTaxCredit: 1030000,
        totalAids: 12520000
      },
      metrics: {
        returnOnDollar: 1.0016,
        returnCents: 100.16,
        netFlow: 20000,
        netFlowPerCapita: 2.73,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 6720000,
        stateSalesTax: 5780000,
        totalTaxes: 12500000
      },
      aids: {
        sharedRevenue: 1610000,
        schoolAids: 9590000,
        transportationAids: 1090000,
        schoolLevyTaxCredit: 1030000,
        totalAids: 13320000
      },
      metrics: {
        returnOnDollar: 1.0656,
        returnCents: 106.56,
        netFlow: 820000,
        netFlowPerCapita: 112.05,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55093",
    name: "Pierce",
    seat: "Ellsworth",
    population: 42212,
    preAct12: {
      taxes: {
        individualIncomeTax: 53420000,
        stateSalesTax: 35720000,
        totalTaxes: 89140000
      },
      aids: {
        sharedRevenue: 3990000,
        schoolAids: 44000000,
        transportationAids: 4420000,
        schoolLevyTaxCredit: 6590000,
        totalAids: 59000000
      },
      metrics: {
        returnOnDollar: 0.66188,
        returnCents: 66.19,
        netFlow: -30140000,
        netFlowPerCapita: -714.01,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 53420000,
        stateSalesTax: 35720000,
        totalTaxes: 89140000
      },
      aids: {
        sharedRevenue: 6300000,
        schoolAids: 44000000,
        transportationAids: 4420000,
        schoolLevyTaxCredit: 6590000,
        totalAids: 61310000
      },
      metrics: {
        returnOnDollar: 0.687794,
        returnCents: 68.78,
        netFlow: -27830000,
        netFlowPerCapita: -659.29,
        classification: "donor"
      }
    }
  },
  {
    fips: "55095",
    name: "Polk",
    seat: "Balsam Lake",
    population: 44798,
    preAct12: {
      taxes: {
        individualIncomeTax: 44460000,
        stateSalesTax: 42960000,
        totalTaxes: 87420000
      },
      aids: {
        sharedRevenue: 4800000,
        schoolAids: 52480000,
        transportationAids: 5470000,
        schoolLevyTaxCredit: 6790000,
        totalAids: 69540000
      },
      metrics: {
        returnOnDollar: 0.79547,
        returnCents: 79.55,
        netFlow: -17880000,
        netFlowPerCapita: -399.12,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 44460000,
        stateSalesTax: 42960000,
        totalTaxes: 87420000
      },
      aids: {
        sharedRevenue: 7580000,
        schoolAids: 52480000,
        transportationAids: 5470000,
        schoolLevyTaxCredit: 6790000,
        totalAids: 72320000
      },
      metrics: {
        returnOnDollar: 0.827271,
        returnCents: 82.73,
        netFlow: -15100000,
        netFlowPerCapita: -337.07,
        classification: "donor"
      }
    }
  },
  {
    fips: "55097",
    name: "Portage",
    seat: "Stevens Point",
    population: 70377,
    preAct12: {
      taxes: {
        individualIncomeTax: 82070000,
        stateSalesTax: 77820000,
        totalTaxes: 159890000
      },
      aids: {
        sharedRevenue: 6970000,
        schoolAids: 71270000,
        transportationAids: 6750000,
        schoolLevyTaxCredit: 10250000,
        totalAids: 95240000
      },
      metrics: {
        returnOnDollar: 0.59566,
        returnCents: 59.57,
        netFlow: -64650000,
        netFlowPerCapita: -918.62,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 82070000,
        stateSalesTax: 77820000,
        totalTaxes: 159890000
      },
      aids: {
        sharedRevenue: 11000000,
        schoolAids: 71270000,
        transportationAids: 6750000,
        schoolLevyTaxCredit: 10250000,
        totalAids: 99270000
      },
      metrics: {
        returnOnDollar: 0.620864,
        returnCents: 62.09,
        netFlow: -60620000,
        netFlowPerCapita: -861.36,
        classification: "donor"
      }
    }
  },
  {
    fips: "55099",
    name: "Price",
    seat: "Phillips",
    population: 14054,
    preAct12: {
      taxes: {
        individualIncomeTax: 11510000,
        stateSalesTax: 11420000,
        totalTaxes: 22930000
      },
      aids: {
        sharedRevenue: 1620000,
        schoolAids: 18840000,
        transportationAids: 2210000,
        schoolLevyTaxCredit: 1880000,
        totalAids: 24550000
      },
      metrics: {
        returnOnDollar: 1.07065,
        returnCents: 107.06,
        netFlow: 1620000,
        netFlowPerCapita: 115.27,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 11510000,
        stateSalesTax: 11420000,
        totalTaxes: 22930000
      },
      aids: {
        sharedRevenue: 3210000,
        schoolAids: 18840000,
        transportationAids: 2210000,
        schoolLevyTaxCredit: 1880000,
        totalAids: 26140000
      },
      metrics: {
        returnOnDollar: 1.139991,
        returnCents: 114.0,
        netFlow: 3210000,
        netFlowPerCapita: 228.4,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55101",
    name: "Racine",
    seat: "Racine",
    population: 197727,
    preAct12: {
      taxes: {
        individualIncomeTax: 230580000,
        stateSalesTax: 205250000,
        totalTaxes: 435830000
      },
      aids: {
        sharedRevenue: 19570000,
        schoolAids: 219870000,
        transportationAids: 15180000,
        schoolLevyTaxCredit: 29990000,
        totalAids: 284610000
      },
      metrics: {
        returnOnDollar: 0.65303,
        returnCents: 65.3,
        netFlow: -151220000,
        netFlowPerCapita: -764.79,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 230580000,
        stateSalesTax: 205250000,
        totalTaxes: 435830000
      },
      aids: {
        sharedRevenue: 25940000,
        schoolAids: 219870000,
        transportationAids: 15180000,
        schoolLevyTaxCredit: 29990000,
        totalAids: 290980000
      },
      metrics: {
        returnOnDollar: 0.667646,
        returnCents: 66.76,
        netFlow: -144850000,
        netFlowPerCapita: -732.58,
        classification: "donor"
      }
    }
  },
  {
    fips: "55103",
    name: "Richland",
    seat: "Richland Center",
    population: 17314,
    preAct12: {
      taxes: {
        individualIncomeTax: 15040000,
        stateSalesTax: 15240000,
        totalTaxes: 30280000
      },
      aids: {
        sharedRevenue: 1950000,
        schoolAids: 23380000,
        transportationAids: 2490000,
        schoolLevyTaxCredit: 2370000,
        totalAids: 30190000
      },
      metrics: {
        returnOnDollar: 0.997028,
        returnCents: 99.7,
        netFlow: -90000,
        netFlowPerCapita: -5.2,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 15040000,
        stateSalesTax: 15240000,
        totalTaxes: 30280000
      },
      aids: {
        sharedRevenue: 3870000,
        schoolAids: 23380000,
        transportationAids: 2490000,
        schoolLevyTaxCredit: 2370000,
        totalAids: 32110000
      },
      metrics: {
        returnOnDollar: 1.060436,
        returnCents: 106.04,
        netFlow: 1830000,
        netFlowPerCapita: 105.69,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55105",
    name: "Rock",
    seat: "Janesville",
    population: 163687,
    preAct12: {
      taxes: {
        individualIncomeTax: 178700000,
        stateSalesTax: 177300000,
        totalTaxes: 356000000
      },
      aids: {
        sharedRevenue: 16770000,
        schoolAids: 191770000,
        transportationAids: 13570000,
        schoolLevyTaxCredit: 23360000,
        totalAids: 245470000
      },
      metrics: {
        returnOnDollar: 0.689522,
        returnCents: 68.95,
        netFlow: -110530000,
        netFlowPerCapita: -675.25,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 178700000,
        stateSalesTax: 177300000,
        totalTaxes: 356000000
      },
      aids: {
        sharedRevenue: 22200000,
        schoolAids: 191770000,
        transportationAids: 13570000,
        schoolLevyTaxCredit: 23360000,
        totalAids: 250900000
      },
      metrics: {
        returnOnDollar: 0.704775,
        returnCents: 70.48,
        netFlow: -105100000,
        netFlowPerCapita: -642.08,
        classification: "donor"
      }
    }
  },
  {
    fips: "55107",
    name: "Rusk",
    seat: "Ladysmith",
    population: 14188,
    preAct12: {
      taxes: {
        individualIncomeTax: 10910000,
        stateSalesTax: 11210000,
        totalTaxes: 22120000
      },
      aids: {
        sharedRevenue: 1670000,
        schoolAids: 20570000,
        transportationAids: 2290000,
        schoolLevyTaxCredit: 1860000,
        totalAids: 26390000
      },
      metrics: {
        returnOnDollar: 1.193038,
        returnCents: 119.3,
        netFlow: 4270000,
        netFlowPerCapita: 300.96,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 10910000,
        stateSalesTax: 11210000,
        totalTaxes: 22120000
      },
      aids: {
        sharedRevenue: 3310000,
        schoolAids: 20570000,
        transportationAids: 2290000,
        schoolLevyTaxCredit: 1860000,
        totalAids: 28030000
      },
      metrics: {
        returnOnDollar: 1.267179,
        returnCents: 126.72,
        netFlow: 5910000,
        netFlowPerCapita: 416.55,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55109",
    name: "St. Croix",
    seat: "Hudson",
    population: 93536,
    preAct12: {
      taxes: {
        individualIncomeTax: 160130000,
        stateSalesTax: 110820000,
        totalTaxes: 270950000
      },
      aids: {
        sharedRevenue: 6900000,
        schoolAids: 76150000,
        transportationAids: 8000000,
        schoolLevyTaxCredit: 17380000,
        totalAids: 108430000
      },
      metrics: {
        returnOnDollar: 0.400185,
        returnCents: 40.02,
        netFlow: -162520000,
        netFlowPerCapita: -1737.51,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 160130000,
        stateSalesTax: 110820000,
        totalTaxes: 270950000
      },
      aids: {
        sharedRevenue: 9930000,
        schoolAids: 76150000,
        transportationAids: 8000000,
        schoolLevyTaxCredit: 17380000,
        totalAids: 111460000
      },
      metrics: {
        returnOnDollar: 0.411367,
        returnCents: 41.14,
        netFlow: -159490000,
        netFlowPerCapita: -1705.12,
        classification: "donor"
      }
    }
  },
  {
    fips: "55111",
    name: "Sauk",
    seat: "Baraboo",
    population: 65763,
    preAct12: {
      taxes: {
        individualIncomeTax: 73430000,
        stateSalesTax: 100170000,
        totalTaxes: 173600000
      },
      aids: {
        sharedRevenue: 6660000,
        schoolAids: 62030000,
        transportationAids: 7170000,
        schoolLevyTaxCredit: 10760000,
        totalAids: 86620000
      },
      metrics: {
        returnOnDollar: 0.498963,
        returnCents: 49.9,
        netFlow: -86980000,
        netFlowPerCapita: -1322.63,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 73430000,
        stateSalesTax: 100170000,
        totalTaxes: 173600000
      },
      aids: {
        sharedRevenue: 10510000,
        schoolAids: 62030000,
        transportationAids: 7170000,
        schoolLevyTaxCredit: 10760000,
        totalAids: 90470000
      },
      metrics: {
        returnOnDollar: 0.521141,
        returnCents: 52.11,
        netFlow: -83130000,
        netFlowPerCapita: -1264.08,
        classification: "donor"
      }
    }
  },
  {
    fips: "55113",
    name: "Sawyer",
    seat: "Hayward",
    population: 18074,
    preAct12: {
      taxes: {
        individualIncomeTax: 16140000,
        stateSalesTax: 22430000,
        totalTaxes: 38570000
      },
      aids: {
        sharedRevenue: 2020000,
        schoolAids: 20640000,
        transportationAids: 2760000,
        schoolLevyTaxCredit: 3090000,
        totalAids: 28510000
      },
      metrics: {
        returnOnDollar: 0.739176,
        returnCents: 73.92,
        netFlow: -10060000,
        netFlowPerCapita: -556.6,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 16140000,
        stateSalesTax: 22430000,
        totalTaxes: 38570000
      },
      aids: {
        sharedRevenue: 4010000,
        schoolAids: 20640000,
        transportationAids: 2760000,
        schoolLevyTaxCredit: 3090000,
        totalAids: 30500000
      },
      metrics: {
        returnOnDollar: 0.79077,
        returnCents: 79.08,
        netFlow: -8070000,
        netFlowPerCapita: -446.5,
        classification: "donor"
      }
    }
  },
  {
    fips: "55115",
    name: "Shawano",
    seat: "Shawano",
    population: 40881,
    preAct12: {
      taxes: {
        individualIncomeTax: 37530000,
        stateSalesTax: 36900000,
        totalTaxes: 74430000
      },
      aids: {
        sharedRevenue: 4520000,
        schoolAids: 51950000,
        transportationAids: 5170000,
        schoolLevyTaxCredit: 5710000,
        totalAids: 67350000
      },
      metrics: {
        returnOnDollar: 0.904877,
        returnCents: 90.49,
        netFlow: -7080000,
        netFlowPerCapita: -173.19,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 37530000,
        stateSalesTax: 36900000,
        totalTaxes: 74430000
      },
      aids: {
        sharedRevenue: 7140000,
        schoolAids: 51950000,
        transportationAids: 5170000,
        schoolLevyTaxCredit: 5710000,
        totalAids: 69970000
      },
      metrics: {
        returnOnDollar: 0.940078,
        returnCents: 94.01,
        netFlow: -4460000,
        netFlowPerCapita: -109.1,
        classification: "donor"
      }
    }
  },
  {
    fips: "55117",
    name: "Sheboygan",
    seat: "Sheboygan",
    population: 118034,
    preAct12: {
      taxes: {
        individualIncomeTax: 143500000,
        stateSalesTax: 126520000,
        totalTaxes: 270020000
      },
      aids: {
        sharedRevenue: 11420000,
        schoolAids: 119530000,
        transportationAids: 10090000,
        schoolLevyTaxCredit: 17550000,
        totalAids: 158590000
      },
      metrics: {
        returnOnDollar: 0.587327,
        returnCents: 58.73,
        netFlow: -111430000,
        netFlowPerCapita: -944.05,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 143500000,
        stateSalesTax: 126520000,
        totalTaxes: 270020000
      },
      aids: {
        sharedRevenue: 16440000,
        schoolAids: 119530000,
        transportationAids: 10090000,
        schoolLevyTaxCredit: 17550000,
        totalAids: 163610000
      },
      metrics: {
        returnOnDollar: 0.605918,
        returnCents: 60.59,
        netFlow: -106410000,
        netFlowPerCapita: -901.52,
        classification: "donor"
      }
    }
  },
  {
    fips: "55119",
    name: "Taylor",
    seat: "Medford",
    population: 19913,
    preAct12: {
      taxes: {
        individualIncomeTax: 18770000,
        stateSalesTax: 16850000,
        totalTaxes: 35620000
      },
      aids: {
        sharedRevenue: 2180000,
        schoolAids: 24520000,
        transportationAids: 2780000,
        schoolLevyTaxCredit: 2660000,
        totalAids: 32140000
      },
      metrics: {
        returnOnDollar: 0.902302,
        returnCents: 90.23,
        netFlow: -3480000,
        netFlowPerCapita: -174.76,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 18770000,
        stateSalesTax: 16850000,
        totalTaxes: 35620000
      },
      aids: {
        sharedRevenue: 4320000,
        schoolAids: 24520000,
        transportationAids: 2780000,
        schoolLevyTaxCredit: 2660000,
        totalAids: 34280000
      },
      metrics: {
        returnOnDollar: 0.962381,
        returnCents: 96.24,
        netFlow: -1340000,
        netFlowPerCapita: -67.29,
        classification: "donor"
      }
    }
  },
  {
    fips: "55121",
    name: "Trempealeau",
    seat: "Whitehall",
    population: 30760,
    preAct12: {
      taxes: {
        individualIncomeTax: 29000000,
        stateSalesTax: 24990000,
        totalTaxes: 53990000
      },
      aids: {
        sharedRevenue: 3360000,
        schoolAids: 39090000,
        transportationAids: 4160000,
        schoolLevyTaxCredit: 4210000,
        totalAids: 50820000
      },
      metrics: {
        returnOnDollar: 0.941285,
        returnCents: 94.13,
        netFlow: -3170000,
        netFlowPerCapita: -103.06,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 29000000,
        stateSalesTax: 24990000,
        totalTaxes: 53990000
      },
      aids: {
        sharedRevenue: 5890000,
        schoolAids: 39090000,
        transportationAids: 4160000,
        schoolLevyTaxCredit: 4210000,
        totalAids: 53350000
      },
      metrics: {
        returnOnDollar: 0.988146,
        returnCents: 98.81,
        netFlow: -640000,
        netFlowPerCapita: -20.81,
        classification: "donor"
      }
    }
  },
  {
    fips: "55123",
    name: "Vernon",
    seat: "Viroqua",
    population: 30714,
    preAct12: {
      taxes: {
        individualIncomeTax: 26670000,
        stateSalesTax: 24950000,
        totalTaxes: 51620000
      },
      aids: {
        sharedRevenue: 3460000,
        schoolAids: 40860000,
        transportationAids: 4420000,
        schoolLevyTaxCredit: 4200000,
        totalAids: 52940000
      },
      metrics: {
        returnOnDollar: 1.025571,
        returnCents: 102.56,
        netFlow: 1320000,
        netFlowPerCapita: 42.98,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 26670000,
        stateSalesTax: 24950000,
        totalTaxes: 51620000
      },
      aids: {
        sharedRevenue: 6060000,
        schoolAids: 40860000,
        transportationAids: 4420000,
        schoolLevyTaxCredit: 4200000,
        totalAids: 55540000
      },
      metrics: {
        returnOnDollar: 1.07594,
        returnCents: 107.59,
        netFlow: 3920000,
        netFlowPerCapita: 127.63,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55125",
    name: "Vilas",
    seat: "Eagle River",
    population: 23047,
    preAct12: {
      taxes: {
        individualIncomeTax: 23450000,
        stateSalesTax: 33810000,
        totalTaxes: 57260000
      },
      aids: {
        sharedRevenue: 2440000,
        schoolAids: 20140000,
        transportationAids: 3220000,
        schoolLevyTaxCredit: 4110000,
        totalAids: 29910000
      },
      metrics: {
        returnOnDollar: 0.522354,
        returnCents: 52.24,
        netFlow: -27350000,
        netFlowPerCapita: -1186.71,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 23450000,
        stateSalesTax: 33810000,
        totalTaxes: 57260000
      },
      aids: {
        sharedRevenue: 4280000,
        schoolAids: 20140000,
        transportationAids: 3220000,
        schoolLevyTaxCredit: 4110000,
        totalAids: 31750000
      },
      metrics: {
        returnOnDollar: 0.554488,
        returnCents: 55.45,
        netFlow: -25510000,
        netFlowPerCapita: -1106.87,
        classification: "donor"
      }
    }
  },
  {
    fips: "55127",
    name: "Walworth",
    seat: "Elkhorn",
    population: 106429,
    preAct12: {
      taxes: {
        individualIncomeTax: 137320000,
        stateSalesTax: 132090000,
        totalTaxes: 269410000
      },
      aids: {
        sharedRevenue: 9930000,
        schoolAids: 92990000,
        transportationAids: 9470000,
        schoolLevyTaxCredit: 18990000,
        totalAids: 131380000
      },
      metrics: {
        returnOnDollar: 0.487658,
        returnCents: 48.77,
        netFlow: -138030000,
        netFlowPerCapita: -1296.92,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 137320000,
        stateSalesTax: 132090000,
        totalTaxes: 269410000
      },
      aids: {
        sharedRevenue: 14300000,
        schoolAids: 92990000,
        transportationAids: 9470000,
        schoolLevyTaxCredit: 18990000,
        totalAids: 135750000
      },
      metrics: {
        returnOnDollar: 0.503879,
        returnCents: 50.39,
        netFlow: -133660000,
        netFlowPerCapita: -1255.86,
        classification: "donor"
      }
    }
  },
  {
    fips: "55129",
    name: "Washburn",
    seat: "Shell Lake",
    population: 16623,
    preAct12: {
      taxes: {
        individualIncomeTax: 14440000,
        stateSalesTax: 15380000,
        totalTaxes: 29820000
      },
      aids: {
        sharedRevenue: 1870000,
        schoolAids: 20630000,
        transportationAids: 2540000,
        schoolLevyTaxCredit: 2600000,
        totalAids: 27640000
      },
      metrics: {
        returnOnDollar: 0.926895,
        returnCents: 92.69,
        netFlow: -2180000,
        netFlowPerCapita: -131.14,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 14440000,
        stateSalesTax: 15380000,
        totalTaxes: 29820000
      },
      aids: {
        sharedRevenue: 3710000,
        schoolAids: 20630000,
        transportationAids: 2540000,
        schoolLevyTaxCredit: 2600000,
        totalAids: 29480000
      },
      metrics: {
        returnOnDollar: 0.988598,
        returnCents: 98.86,
        netFlow: -340000,
        netFlowPerCapita: -20.45,
        classification: "donor"
      }
    }
  },
  {
    fips: "55131",
    name: "Washington",
    seat: "West Bend",
    population: 136759,
    preAct12: {
      taxes: {
        individualIncomeTax: 264670000,
        stateSalesTax: 155850000,
        totalTaxes: 420520000
      },
      aids: {
        sharedRevenue: 9150000,
        schoolAids: 97760000,
        transportationAids: 10500000,
        schoolLevyTaxCredit: 26840000,
        totalAids: 144250000
      },
      metrics: {
        returnOnDollar: 0.343028,
        returnCents: 34.3,
        netFlow: -276270000,
        netFlowPerCapita: -2020.12,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 264670000,
        stateSalesTax: 155850000,
        totalTaxes: 420520000
      },
      aids: {
        sharedRevenue: 13170000,
        schoolAids: 97760000,
        transportationAids: 10500000,
        schoolLevyTaxCredit: 26840000,
        totalAids: 148270000
      },
      metrics: {
        returnOnDollar: 0.352587,
        returnCents: 35.26,
        netFlow: -272250000,
        netFlowPerCapita: -1990.73,
        classification: "donor"
      }
    }
  },
  {
    fips: "55133",
    name: "Waukesha",
    seat: "Waukesha",
    population: 406978,
    preAct12: {
      taxes: {
        individualIncomeTax: 1150000000,
        stateSalesTax: 520000000,
        totalTaxes: 1670000000
      },
      aids: {
        sharedRevenue: 22500000,
        schoolAids: 160000000,
        transportationAids: 28000000,
        schoolLevyTaxCredit: 115000000,
        totalAids: 325500000
      },
      metrics: {
        returnOnDollar: 0.19491,
        returnCents: 19.49,
        netFlow: -1344500000,
        netFlowPerCapita: -3303.62,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 1150000000,
        stateSalesTax: 520000000,
        totalTaxes: 1670000000
      },
      aids: {
        sharedRevenue: 27500000,
        schoolAids: 160000000,
        transportationAids: 28000000,
        schoolLevyTaxCredit: 115000000,
        totalAids: 330500000
      },
      metrics: {
        returnOnDollar: 0.197904,
        returnCents: 19.79,
        netFlow: -1339500000,
        netFlowPerCapita: -3291.33,
        classification: "donor"
      }
    }
  },
  {
    fips: "55135",
    name: "Waupaca",
    seat: "Waupaca",
    population: 51812,
    preAct12: {
      taxes: {
        individualIncomeTax: 50140000,
        stateSalesTax: 47940000,
        totalTaxes: 98080000
      },
      aids: {
        sharedRevenue: 5610000,
        schoolAids: 61730000,
        transportationAids: 6100000,
        schoolLevyTaxCredit: 7320000,
        totalAids: 80760000
      },
      metrics: {
        returnOnDollar: 0.823409,
        returnCents: 82.34,
        netFlow: -17320000,
        netFlowPerCapita: -334.29,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 50140000,
        stateSalesTax: 47940000,
        totalTaxes: 98080000
      },
      aids: {
        sharedRevenue: 8860000,
        schoolAids: 61730000,
        transportationAids: 6100000,
        schoolLevyTaxCredit: 7320000,
        totalAids: 84010000
      },
      metrics: {
        returnOnDollar: 0.856546,
        returnCents: 85.65,
        netFlow: -14070000,
        netFlowPerCapita: -271.56,
        classification: "donor"
      }
    }
  },
  {
    fips: "55137",
    name: "Waushara",
    seat: "Wautoma",
    population: 24520,
    preAct12: {
      taxes: {
        individualIncomeTax: 20690000,
        stateSalesTax: 20750000,
        totalTaxes: 41440000
      },
      aids: {
        sharedRevenue: 2790000,
        schoolAids: 32130000,
        transportationAids: 3420000,
        schoolLevyTaxCredit: 3500000,
        totalAids: 41840000
      },
      metrics: {
        returnOnDollar: 1.009653,
        returnCents: 100.97,
        netFlow: 400000,
        netFlowPerCapita: 16.31,
        classification: "recipient"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 20690000,
        stateSalesTax: 20750000,
        totalTaxes: 41440000
      },
      aids: {
        sharedRevenue: 4890000,
        schoolAids: 32130000,
        transportationAids: 3420000,
        schoolLevyTaxCredit: 3500000,
        totalAids: 43940000
      },
      metrics: {
        returnOnDollar: 1.060328,
        returnCents: 106.03,
        netFlow: 2500000,
        netFlowPerCapita: 101.96,
        classification: "recipient"
      }
    }
  },
  {
    fips: "55139",
    name: "Winnebago",
    seat: "Oshkosh",
    population: 171735,
    preAct12: {
      taxes: {
        individualIncomeTax: 208790000,
        stateSalesTax: 201520000,
        totalTaxes: 410310000
      },
      aids: {
        sharedRevenue: 16610000,
        schoolAids: 170500000,
        transportationAids: 14230000,
        schoolLevyTaxCredit: 25020000,
        totalAids: 226360000
      },
      metrics: {
        returnOnDollar: 0.55168,
        returnCents: 55.17,
        netFlow: -183950000,
        netFlowPerCapita: -1071.13,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 208790000,
        stateSalesTax: 201520000,
        totalTaxes: 410310000
      },
      aids: {
        sharedRevenue: 21990000,
        schoolAids: 170500000,
        transportationAids: 14230000,
        schoolLevyTaxCredit: 25020000,
        totalAids: 231740000
      },
      metrics: {
        returnOnDollar: 0.564792,
        returnCents: 56.48,
        netFlow: -178570000,
        netFlowPerCapita: -1039.8,
        classification: "donor"
      }
    }
  },
  {
    fips: "55141",
    name: "Wood",
    seat: "Wisconsin Rapids",
    population: 74207,
    preAct12: {
      taxes: {
        individualIncomeTax: 81010000,
        stateSalesTax: 75360000,
        totalTaxes: 156370000
      },
      aids: {
        sharedRevenue: 7600000,
        schoolAids: 82520000,
        transportationAids: 7450000,
        schoolLevyTaxCredit: 10370000,
        totalAids: 107940000
      },
      metrics: {
        returnOnDollar: 0.690286,
        returnCents: 69.03,
        netFlow: -48430000,
        netFlowPerCapita: -652.63,
        classification: "donor"
      }
    },
    postAct12: {
      taxes: {
        individualIncomeTax: 81010000,
        stateSalesTax: 75360000,
        totalTaxes: 156370000
      },
      aids: {
        sharedRevenue: 12000000,
        schoolAids: 82520000,
        transportationAids: 7450000,
        schoolLevyTaxCredit: 10370000,
        totalAids: 112340000
      },
      metrics: {
        returnOnDollar: 0.718424,
        returnCents: 71.84,
        netFlow: -44030000,
        netFlowPerCapita: -593.34,
        classification: "donor"
      }
    }
  },
];

/**
 * Fast O(1) dictionary lookup by 5-digit county FIPS code.
 * Initialized with Object.create(null) to prevent prototype pollution collisions.
 */
export const COUNTY_BY_FIPS: Record<string, CountyRecord> = WI_COUNTIES.reduce(
  (acc, county) => {
    acc[county.fips] = county;
    return acc;
  },
  Object.create(null) as Record<string, CountyRecord>
);

/**
 * Fast O(1) dictionary lookup by normalized lowercase county name.
 * Initialized with Object.create(null) to prevent prototype pollution collisions.
 */
export const COUNTY_BY_NAME: Record<string, CountyRecord> = WI_COUNTIES.reduce(
  (acc, county) => {
    acc[county.name.toLowerCase()] = county;
    return acc;
  },
  Object.create(null) as Record<string, CountyRecord>
);

/**
 * Retrieve a county by its 5-digit FIPS code.
 * Safely guards against prototype collisions and non-string/null/undefined inputs.
 */
export function getCountyByFips(fips: string): CountyRecord | undefined {
  if (!fips || typeof fips !== 'string') {
    return undefined;
  }
  return Object.hasOwn(COUNTY_BY_FIPS, fips) ? COUNTY_BY_FIPS[fips] : undefined;
}

/**
 * Retrieve a county by name (case-insensitive and trimmed).
 * Safely guards against prototype collisions and non-string/null/undefined inputs.
 */
export function getCountyByName(name: string): CountyRecord | undefined {
  if (!name || typeof name !== 'string') {
    return undefined;
  }
  const normalized = name.trim().toLowerCase();
  if (!normalized) {
    return undefined;
  }
  return Object.hasOwn(COUNTY_BY_NAME, normalized) ? COUNTY_BY_NAME[normalized] : undefined;
}

/**
 * Precomputed statewide summary aggregates across all 72 counties.
 */
export const STATEWIDE_SUMMARY: StatewideSummary = {
  population: 5893834,
  preAct12: {
    taxes: {
      individualIncomeTax: 8850020000,
      stateSalesTax: 6650030000,
      totalTaxes: 15500050000
    },
    aids: {
      sharedRevenue: 753000000,
      schoolAids: 5360030000,
      transportationAids: 535960000,
      schoolLevyTaxCredit: 1040010000,
      totalAids: 7689000000
    },
    metrics: {
      returnOnDollar: 0.496063,
      returnCents: 49.61,
      netFlow: -7811050000,
      netFlowPerCapita: -1325.29,
      classification: "donor"
    },
    donorCount: 54,
    recipientCount: 18
  },
  postAct12: {
    taxes: {
      individualIncomeTax: 8850020000,
      stateSalesTax: 6650030000,
      totalTaxes: 15500050000
    },
    aids: {
      sharedRevenue: 1027400000,
      schoolAids: 5360030000,
      transportationAids: 535960000,
      schoolLevyTaxCredit: 1040010000,
      totalAids: 7963400000
    },
    metrics: {
      returnOnDollar: 0.513766,
      returnCents: 51.38,
      netFlow: -7536650000,
      netFlowPerCapita: -1278.73,
      classification: "donor"
    },
    donorCount: 52,
    recipientCount: 20
  }
};

/**
 * Authoritative agency citations and statutory references.
 */
export const AGENCY_CITATIONS: AgencyCitation[] = [
  {
    id: "dor-income-tax",
    agency: "Wisconsin Department of Revenue (DOR)",
    program: "Net Individual Income Tax",
    statutoryAuthority: "Wis. Stat. Chapter 71, Subchapters I & II",
    description: "Annual individual income tax collections by county of taxpayer residence, compiled from Form 1 and Form 1A income tax filings after statutory deductions and credits.",
    reportUrl: "https://www.revenue.wi.gov/Pages/ISE/Data.aspx"
  },
  {
    id: "dor-sales-tax",
    agency: "Wisconsin Department of Revenue (DOR)",
    program: "5.0% State Sales Tax",
    statutoryAuthority: "Wis. Stat. §§ 77.52 & 77.53",
    description: "State 5.0% general sales and use tax collections by county of transaction origin. Excludes optional local county sales taxes (0.5% or 0.9%).",
    reportUrl: "https://www.revenue.wi.gov/Pages/Report/County-Sales-Tax-Distributions.aspx"
  },
  {
    id: "dor-shared-revenue",
    agency: "Wisconsin Department of Revenue (DOR)",
    program: "Shared Revenue & County and Municipal Aid (2023 Act 12)",
    statutoryAuthority: "Wis. Stat. Chapter 79 (§§ 79.035, 79.036, 79.037) & § 25.49",
    description: "General unrestricted state operating assistance returned to county and municipal governments. Includes 2023 Wisconsin Act 12 Supplemental County and Municipal Aid funded by 20% of state sales tax collections.",
    reportUrl: "https://www.revenue.wi.gov/Pages/GovServices/Shared-Revenue-Payments.aspx"
  },
  {
    id: "dpi-general-aid",
    agency: "Wisconsin Department of Public Instruction (DPI)",
    program: "K-12 General School Aids (Equalization Aid)",
    statutoryAuthority: "Wis. Stat. Chapter 121, Subchapter II (§§ 121.08, 121.105)",
    description: "State general equalization aid distributed to public school districts based on three-tier equalized property valuation per pupil, equalizing educational resources across property-wealth disparities.",
    reportUrl: "https://dpi.wi.gov/sfs/aid/general/overview"
  },
  {
    id: "wisdot-gta",
    agency: "Wisconsin Department of Transportation (WisDOT)",
    program: "General Transportation Aids (GTA)",
    statutoryAuthority: "Wis. Stat. § 86.30",
    description: "Transportation aid returned to counties and municipalities from the Segregated Transportation Fund, reimbursing eligible highway maintenance costs (~22% county cost-share) and municipal road mileage.",
    reportUrl: "https://wisconsindot.gov/Pages/doing-bus/local-gov/astnce-pgms/highway/gta.aspx"
  },
  {
    id: "dor-sltc",
    agency: "Wisconsin Department of Revenue (DOR)",
    program: "School Levy Tax Credit (SLTC)",
    statutoryAuthority: "Wis. Stat. § 79.10(2)",
    description: "State property tax relief credit distributed to municipalities based on their 3-year share of total statewide school levies, applied directly by local treasurers to reduce school property tax burdens.",
    reportUrl: "https://www.revenue.wi.gov/Pages/GovServices/mfr.aspx"
  },
  {
    id: "lfb-papers",
    agency: "Wisconsin Legislative Fiscal Bureau (LFB)",
    program: "State Public Finance Informational Papers",
    statutoryAuthority: "Wis. Stat. § 13.95",
    description: "Nonpartisan fiscal analyses covering Informational Paper #17 (State Property Tax Credits), #27 (School Aids), #39 (Transportation Aid), and #79 (Shared Revenue Program).",
    reportUrl: "https://legis.wisconsin.gov/lfb/publications/informational-papers/"
  }
];
