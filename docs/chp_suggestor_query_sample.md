GET odt_vehicle_suggestor/_mapping
GET odt_vehicle_suggestor/data/_search
PUT odt_vehicle_suggestor/data/101
{
  "color": [ "red", "BLUE", "GolD" ],
  "manufacturer": "hOnda",
  "model": "suv 2000 edition",
  "postcode": {
    "alias": "AB",
    "name": "AberDeen",
    "location": {
      "lat": 57.1499749, 
      "lon": -2.1960765
    }
  },
  "normal_suggest": {
    "input": ["suv 2000 edition"]
  },
  "suggest_color": {
    "input": [ "red", "blue", "gold" ],
    "contexts": {
      "color": [ "color_suite" ]
    }
  },
  "suggest_manufacturer": {
    "input": [ "mazda", "toyota", "suzuki" ],
    "contexts": {
      "manufacturer": [ "from_japan" ]
    }
  },
  "suggest_postcode": {
    "input": [ "B", "SS" ],
    "contexts": {
      "postcode": [ "also_popular_area" ]
    }
  }
}
PUT odt_vehicle_suggestor/data/102
{
  "color": [ "GolD", "silvEr" ],
  "manufacturer": "toYoTA",
  "model": "subaru basic",
  "postcode": {
    "alias": "B",
    "name": "Birmingham",
    "location": {
      "lat": 52.477564, 
      "lon": -2.0037151
    }
  },
  "normal_suggest": {
    "input": ["subaru basic"]
  },
  "suggest_color": {
    "input": [ "gold", "silver" ],
    "contexts": {
      "color": [ "color_suite" ]
    }
  },
  "suggest_manufacturer": {
    "input": [ "mazda", "toyota", "suzuki" ],
    "contexts": {
      "manufacturer": [ "from_japan" ]
    }
  },
  "suggest_postcode": {
    "input": [ "AB", "SS" ],
    "contexts": {
      "postcode": [ "also_popular_area" ]
    }
  }
}
# color (silver only gets 1 entry)
GET odt_vehicle_suggestor/_search
{
  "suggest": {
    "1": {
      "prefix": "gold",
      "completion": {
        "field": "suggest_color",
        "size": 5,
        "contexts": {
          "color": [ "color_suite" ]
        }
      }
    }
  }
}
# postcode (B only got 1, 101) (SS got 2)
GET odt_vehicle_suggestor/_search
{
  "suggest": {
    "1": {
      "prefix": "sS",
      "completion": {
        "field": "suggest_postcode",
        "size": 5,
        "contexts": {
          "postcode": [ "also_popular_area" ]
        }
      }
    }
  }
}
# manufacturer (mazda got 2) (nissan got none)
GET odt_vehicle_suggestor/_search
{
  "suggest": {
    "1": {
      "prefix": "to",
      "completion": {
        "field": "suggest_manufacturer",
        "size": 5,
        "contexts": {
          "manufacturer": [ "from_japan" ]
        }
      }
    }
  }
}
# normal means by the model name... (s returns 2)(su returns 2)(suv returns 1)
GET odt_vehicle_suggestor/_search
{
  "suggest": {
    "1": {
      "prefix": "suv",
      "completion": {
        "field": "normal_suggest",
        "size": 5
      }
    }
  }
}


# cleanup (if necessary)
POST odt_vehicle_suggestor/data/_delete_by_query
{
  "query": {
    "match_all": {}
  }
}
