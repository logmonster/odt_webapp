
** Mapping **


PUT odt_vehicle_suggestor
{
  "settings": {
    "analysis": {
      "normalizer": {
        "lowercase_normalizer": {
          "type": "custom",
          "char_filter": [],
          "filter": [
            "lowercase"
          ]
        }
      }
    }
  },
  "mappings": {
    "data": {
      "properties": {
        "manufacturer": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 200
            }
          }
        },
        "model": {
          "type": "text",
          "fields": {
            "keyword": {
              "type": "keyword",
              "ignore_above": 200
            }
          }
        },
        "color": {
          "type": "keyword",
          "normalizer": "lowercase_normalizer"
        },
        "postcode": {
          "properties": {
            "alias": {
              "type": "keyword",
              "normalizer": "lowercase_normalizer"
            },
            "name": {
              "type": "keyword",
              "normalizer": "lowercase_normalizer"
            },
            "location": {
              "type": "geo_point"
            }
          }
        },
        "suggest_model": {
          "type": "completion",
          "analyzer": "standard",
          "preserve_separators": true,
          "preserve_position_increments": true,
          "max_input_length": 50
        },
        "suggest_color": {
          "type": "completion",
          "analyzer": "standard",
          "preserve_separators": true,
          "preserve_position_increments": true,
          "max_input_length": 50
        },
        "suggest_manufacturer": {
          "type": "completion",
          "analyzer": "standard",
          "preserve_separators": true,
          "preserve_position_increments": true,
          "max_input_length": 50,
          "contexts": [
            {
              "name": "manufacturer",
              "type": "CATEGORY"
            }
          ]
        },
        "suggest_postcode": {
          "type": "completion",
          "analyzer": "standard",
          "preserve_separators": true,
          "preserve_position_increments": true,
          "max_input_length": 50
        }
      }
    }
  }
}
