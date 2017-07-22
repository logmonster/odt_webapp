
GET odt_vehicle_suggestor/_mapping
GET odt_vehicle_suggestor/data/_search
PUT odt_vehicle_suggestor/data/101
{
  "color": [
    "red",
    "BLUE",
    "GolD"
  ],
  "manufacturer": "hOnda",
  "model": "suv 2000 edition",
  "postcode": [
    {
      "alias": "AB",
      "name": "AberDeen",
      "location": {
        "lat": 57.1499749,
        "lon": -2.1960765
      }
    },
    {
      "alias": "BD",
      "name": "Bradford",
      "location": {
        "lat": 53.7970776,
        "lon": -1.8244002
      }
    }
  ],
  "suggest_model": {
    "input": [
      "suv 2000 edition"
    ]
  },
  "suggest_color": {
    "input": [
      "red",
      "blue",
      "gold"
    ]
  },
  "suggest_manufacturer": {
    "input": [
      "mazda",
      "toyota",
      "suzuki"
    ],
    "contexts": {
      "manufacturer": [
        "from_japan"
      ]
    }
  },
  "suggest_postcode": {
    "input": [
      "AB",
      "BD"
    ]
  }
}
PUT odt_vehicle_suggestor/data/102
{
  "color": [ "GolD", "silvEr" ],
  "manufacturer": "toYoTA",
  "model": "subaru basic",
  "postcode": [
    {
      "alias": "B",
      "name": "Birmingham",
      "location": {
        "lat": 52.477564, 
        "lon": -2.0037151
      }
    },
    {
      "alias": "AB",
      "name": "AberDeen",
      "location": {
        "lat": 57.1499749,
        "lon": -2.1960765
      }
    }
  ],
  "suggest_model": {
    "input": ["subaru basic"]
  },
  "suggest_color": {
    "input": [ "gold", "silver" ]
  },
  "suggest_manufacturer": {
    "input": [ "mazda", "toyota", "suzuki" ],
    "contexts": {
      "manufacturer": [ "from_japan" ]
    }
  },
  "suggest_postcode": {
    "input": [ "AB", "B" ]
  }
}
PUT odt_vehicle_suggestor/data/103
{"color":["GolD","silvEr", "blue"],"manufacturer":"audi","model":"cooper basic (europe edition)","postcode":[{"alias":"B","name":"Birmingham","location":{"lat":52.477564,"lon":-2.0037151}},{"alias":"AB","name":"AberDeen","location":{"lat":57.1499749,"lon":-2.1960765}}],"suggest_model":{"input":["cooper basic (europe edition)"]},"suggest_color":{"input":["gold","silver", "blue"]},"suggest_manufacturer":{"input":["audi","benz","ford"],"contexts":{"manufacturer":["from_europe"]}},"suggest_postcode":{"input":["AB","B"]}}

# color (silver only gets 1 entry)
GET odt_vehicle_suggestor/_search
{
  "suggest": {
    "1": {
      "prefix": "gold",
      "completion": {
        "field": "suggest_color",
        "size": 5
      }
    }
  }
}
# postcode (B only got 2, 101, 102) (bd got 1) (ab got 2)
GET odt_vehicle_suggestor/_search
{
  "suggest": {
    "1": {
      "prefix": "ab",
      "completion": {
        "field": "suggest_postcode",
        "size": 5
      }
    }
  }
}
# manufacturer (mazda got 2) (nissan got none)
GET odt_vehicle_suggestor/_search
{
  "suggest": {
    "1": {
      "prefix": "niss",
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
# different context "category" from_europe vs from_japan
GET odt_vehicle_suggestor/_search
{
  "suggest": {
    "1": {
      "prefix": "ford",
      "completion": {
        "field": "suggest_manufacturer",
        "size": 5,
        "contexts": {
          "manufacturer": [ "from_europe" ]
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

-- set 2 (basic query and suggest) --

GET odt_vehicle_suggestor/data/_search
{
  "query": {
    "match": {
      "postcode.alias": "nr"
    }
  }
}
GET odt_vehicle_suggestor/data/_search
{
  "suggest": {
    "1": {
      "prefix": "v5",
      "completion": {
        "field": "suggest_model",
        "size": 5  
      }
    }
  }
}
GET odt_vehicle_suggestor/data/_search
{
  "suggest": {
    "1": {
      "prefix": "pink",
      "completion": {
        "field": "suggest_color",
        "size": 5  
      }
    }
  }
}
GET odt_vehicle_suggestor/data/_search
{
  "suggest": {
    "1": {
      "prefix": "ss",
      "completion": {
        "field": "suggest_postcode",
        "size": 5  
      }
    }
  }
}
GET odt_vehicle_suggestor/data/_search
{
  "suggest": {
    "1": {
      "prefix": "ford",
      "completion": {
        "field": "suggest_manufacturer",
        "size": 5,
        "contexts": {
          "manufacturer": [
            "region"
          ]
        }
      }
    }
  }
}
GET odt_vehicle_suggestor/_search
{
  "suggest": {
    "1": {
      "prefix": "HoN",
      "completion": {
        "field": "suggest_manufacturer",
        "size": 5,
        "contexts": {
          "manufacturer": [ "region" ]
        }
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


------- after ingestion -------
GET odt_vehicle_suggestor/data/_search
{
  "query": {
    "match": {
      "postcode.alias": "nr"
    }
  }
}
GET odt_vehicle_suggestor/data/_search
{
  "suggest": {
    "1": {
      "prefix": "v7",
      "completion": {
        "field": "suggest_model",
        "size": 5  
      }
    }
  }
}
GET odt_vehicle_suggestor/data/_search
{
  "suggest": {
    "1": {
      "prefix": "Blu",
      "completion": {
        "field": "suggest_color",
        "size": 5  
      }
    }
  }
}
GET odt_vehicle_suggestor/data/_search
{
  "suggest": {
    "1": {
      "prefix": "ss",
      "completion": {
        "field": "suggest_postcode",
        "size": 5  
      }
    }
  }
}
GET odt_vehicle_suggestor/data/_search
{
  "suggest": {
    "1": {
      "prefix": "ford",
      "completion": {
        "field": "suggest_manufacturer",
        "size": 5  
      }
    }
  }
}

------- obsolete -------

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
