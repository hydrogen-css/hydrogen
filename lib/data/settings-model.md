# Hydrogen settings data model

- info:                    | object  |          | optional | Note: this object is informative only
  - docs:                  | string  |          | optional |
  - settings:              | string  |          | optional |
  - code:                  | string  |          | optional |
  - feedback:              | string  |          | optional |
  - roadmap:               | string  |          | optional |
- input:                   | array   | required |          |
  - path                   | string  | required |          |
- output:                  | string  | required |          |
- build:                   | object  |          | optional |
  - base_query_key:        | string  |          | optional |
  - dark_mode:             | string  |          | optional | Note: preference | toggle
  - logs:                  | boolean |          | optional |
  - minification:          | boolean |          | optional |
  - prefixing:             | boolean |          | optional |
  - quiet:                 | boolean |          | optional |
  - reset_styles:          | boolean |          | optional |
  - validation:            | boolean |          | optional |
  - var_export:            | boolean |          | optional |
- styles:                  | object  | required |          |
  - foundations:           | object  | required |          |
    - media:               | array   |          | optional |
      - child:             | object  |          | optional |
        - key:             | string  | required |          |
        - query:           | string  | required |          |
    - typography:          | array   | required |          |
      - child:             | object  | required |          |
        - query_key:       | string  | required |          |
        - line_height:     | string  | required |          |
        - size:            | string  | required |          |
        - type_scale:      | string  | required |          |
  - tokens:                | object  |          | optional |
    - colors:              | array   |          | optional |
      - child:             | object  |          | optional |
        - key:             | string  | required |          |
        - color:           | string  | required |          |
        - modifiers:       | array   |          | optional |
          - child          | object  |          | optional |
            - key:         | string  | required |          |
            - color:       | string  | required |          |
    - containers:          | array   |          | optional |
      - child:             | object  |          | optional |
        - key:             | string  | required |          |
        - max_width:       | string  | required |          |
    - fonts:               | array   |          | optional |
      - child:             | object  |          | optional |
        - key:             | string  | required |          |
        - family:          | string  | required |          |
    - gradients:           | array   |          | optional |
      - child:             | object  |          | optional |
        - key:             | string  | required |          |
        - gradient:        | string  | required |          |
        - fallback:        | string  | required |          |
    - radii:               | array   |          | optional |
      - child:             | object  |          | optional |
        - key:             | string  | required |          |
        - radius:          | string  | required |          |
    - shadows:             | array   |          | optional |
      - child:             | object  |          | optional |
        - key:             | string  | required |          |
        - shadow:          | string  | required |          |
    - transitions:         | object  |          | optional |
      - duration:          | array   |          | optional |
        - child:           | object  |          | optional |
          - key:           | string  | required |          |
          - duration:      | string  | required |          |
      - functions:         | array   |          | optional |
        - child:           | object  |          | optional |
          - key:           | string  | required |          |
          - function:      | string  | required |          |
      - delays:            | array   |          | optional |
        - child:           | object  |          | optional |
          - key:           | string  | required |          |
          - delay:         | string  | required |          |