# Hydrogen properties data model

- properties:              | object  | required |          | 
  - key:                   | object  | required |          | Note: property key
    - title:               | object  | required |          | 
      - en:                | string  | required |          |
      - fr:                | string  | required |          |
    - group:               | string  | required |          | Note: used to classify properties
    - property_keys:       | object  | required |          | 
      - key:               | object  | required |          | Note: property name option
        - attribute        | array   | required |          | Note: full attribute found
          - file:          | string  |          | optional |
    - syntax:              | object  | required |          | 
      - key:               | object  | required |          | Note: data attribute syntax
        - default:         | boolean | required |          | 
        - options:         | object  | required |          | 
          - key:           | object  | required |          | Note: option name
            - required:    | boolean | required |          | 
            - types:       | object  | required |          | 
              - key:       | boolean | required |          | 
              - css:       | boolean | required |          | 
            - values:      | array   | required |          | 
              - value:     | string  | required |          | 
    - incompatibilities:   | array   |          | optional |
      - property:          | string  |          | optional |

# Planned next version

The goal of this version is to consolidate the entire attribute and all of its parsed pieces into a single object BEFORE CSS construction so that errors can be caught earlier and to allow for attributes to succeed if only one of their queries is invalid.

- properties:              | object  | required |          | 
  - key:                   | object  | required |          | Note: property key
    - title:               | string  | required |          | 
    - property_keys:       | object  | required |          | 
      - key:               | object  | required |          | Note: property name option
--START NEW-------------------------------------------------
        - attribute:       | object  | required |          | Note: full attribute found
          - property:      | string  | required |          | Note: repeated from parent key
          - queries:       | object  |          | optional |
            - key:         | object  |          | optional | Note: full query string
              - media:     | string  | required |          |
              - modifiers: | array   |          | optional |
              - options:   | array   | required |          |
          - files:         | array   |          | optional |
--END NEW---------------------------------------------------
            - file:        | string  |          | optional |
    - syntax:              | object  | required |          | 
      - key:               | object  | required |          | Note: data attribute syntax
        - default:         | boolean | required |          | 
        - options:         | object  | required |          | 
          - key:           | object  | required |          | Note: option name
            - required:    | boolean | required |          | 
            - types:       | object  | required |          | 
              - key:       | boolean | required |          | 
              - css:       | boolean | required |          | 
            - values:      | array   | required |          | 
              - value:     | string  | required |          | 
    - incompatibilities:   | array   |          | optional |
      - property:          | string  |          | optional |