# World Cup Bristow Challenge — v1 Foundation

Fresh foundation build for the Bristow family World Cup pool.

## Deploy
1. Upload these files to the `v1-foundation` GitHub branch or replace your repo contents.
2. Netlify build command: blank.
3. Netlify publish directory: `.`
4. Open the deployed site and verify Admin shows `Package: v1-foundation`.

## What this version includes
- Clean multi-file structure.
- Firebase Realtime Database service layer.
- Browser local fallback if Firebase is unavailable.
- Bottom-navigation app layout.
- Home, Matches, Tournament, Family, Admin screens.
- Match filters: All / Completed / Upcoming.
- Tournament toggle: Groups / Knockout Bracket.
- Full bracket prediction builder with auto-advance.
- Match-by-match picks.
- Dynamic scoring: pending picks earn 0 until results are final.
- Admin tools: initialize/reset foundation data, family members, scoring rules, backup export/import, clear picks.

## Firebase path
All app data is stored under:

`worldCupBristowChallenge/v1`

This keeps it separate from older prototype data.
