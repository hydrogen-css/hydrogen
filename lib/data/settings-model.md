# Hydrogen settings data model

- info:              | object  |          | optional
  - docs:            | string  |          | optional
  - settings:        | string  |          | optional
  - code:            | string  |          | optional
  - feedback:        | string  |          | optional
  - roadmap:         | string  |          | optional

- input:             | array   | required | 

- output:            | string  | required | 

- build:             | object  | required | 
  - dark_mode:       | string  | required | 
  - logs:            | boolean | required | 
  - minification:    | boolean | required | 
  - prefixing:       | boolean | required | 
  - quiet:           | boolean | required | 
  - reset_styles:    | boolean | required | 
  - validation:      | boolean | required | 
  - var_export:      | boolean | required | 

- styles:            | object  | required | 

  - foundations:     | object  | required | 
    - media:         | array   |          | optional
      - key:         | string  | required | 
      - query:       | string  | required | 

    - typography:    | array   | required | 
      - query_key:   | string  | required | 
      - line_height: | string  | required | 
      - size:        | string  | required | 
      - type_scale:  | string  | required | 

  - tokens:          | object  | required | 

    - colors:        | array   |          | optional
      - key:         | string  | required | 
      - color:       | string  | required | 
      - modifiers:   | array   |          | optional
        - key:       | string  | required | 
        - color:     | string  | required | 

    - containers:    | array   |          | optional
      - key:         | string  | required | 
      - max_width:   | string  | required | 

    - fonts:         | array   |          | optional
      - key:         | string  | required | 
      - family:      | string  | required | 

    - gradients:     | array   |          | optional
      - key:         | string  | required | 
      - gradient:    | string  | required | 
      - fallback:    | string  | required | 

    - radii:         | array   |          | optional
      - key:         | string  | required | 
      - radius:      | string  | required | 

    - shadows:       | array   |          | optional
      - key:         | string  | required | 
      - shadow:      | string  | required | 

    - transitions:   | object  |          | optional

      - duration:    | array   |          | optional
        - key:       | string  | required | 
        - duration:  | string  | required | 

      - functions:   | array   |          | optional
        - key:       | string  | required | 
        - function:  | string  | required | 
        
      - delays:      | array   |          | optional
        - key:       | string  | required | 
        - delay:     | string  | required | 