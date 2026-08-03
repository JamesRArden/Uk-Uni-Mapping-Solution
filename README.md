This project is a university mapping platform that visualises all Guardian‑ranked UK universities on an interactive map. Each university is displayed with its ranking, location, 
and a short description, allowing users to explore and compare institutions geographically.

The system uses Supabase as an online database, where all university data is stored and accessed through secure Row Level Security (RLS) 
select policies. A lightweight JavaScript frontend retrieves this data and renders it on a Leaflet.js map, placing markers at each university’s
coordinates and attaching popups containing ranking and metadata.

The result is a fast, clean, and fully browser‑based mapping solution that combines real‑time database queries, geospatial visualisation, 
and Guardian league‑table data into a single interactive tool.
