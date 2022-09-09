# 🌞 Hydrogen: settings validation guidance

## When a setting is required

- Validate the setting exists
- Validate its type
- If the setting is an array, validate its length is not 0
- If the setting is a string with specific values, validate the value matches
- Load child validation scripts

## When a setting is optional

- Check if the setting exists
- If it does, validate its type
- If the setting is an array, validate its length is not 0
- If the setting is a string with specific values, validate the value matches
- Load the child validation scripts
