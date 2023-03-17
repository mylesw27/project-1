# Superback Football
Get ready for some football! You will be taking control of Jo Backson, the greatest runningback in the history of the Canvas Football League. Your quarterback just broke his arm and now YOU must carry your team to vitory in the Canvas League Great Bowl. If you can score enough touchdowns, you just might lead the Javatown Scripters to a championship.


## The Game
This is a 2D, side-scrolling game. The game will start with the player on the left side of the canvas. The player must then navigate to the far right end of the canvas while avoiding defenders. A collision with a defender is a "tackle" and the play ends. Reaching the far end without being tackled results in a touchdown and earns 7 points. The opponent's scoring drive is then calculated with random outcomes to determine if they also scored 7 points. If the player can score more points than the opponent in the allotted time, they win the game. 

## Tech Stack
- HTML/CSS 
- JavaScript 

## Wireframes
[title](./title-screen.png)
[start](./gameplay-screen-start.png)
[scoring](./gameplay-screen-scoring.png)
[opponent](./gameplay-screen-opponent-drive.png)
[win](./win-screen.png)

## MVP Goals
- Render a title screen
- Render a football field 
- Render the player and defenders 
- Determine computer's score and track scores
- Render a scoreboard that displays scores and time remaining
- End game when clock reached zero
- Render a win screen if player is the winner

## Stretch Goals
- Multiple plays or "downs" if player is tackled. Tracks where player was stopped/tackled. 4 tries to score.
- Defender movement that moves towards user, not just pre-determined path.
- Being able to choose play type (which direction run starts)
- Opponents odds of scoring determined by how far player reached on their turn.

## Potential Roadblocks
- Moving the canvas to create a side-scrolling feel to gameplay
- Rendering multiple Defenders/Players on field
- Defender/player movement
- Determining a balance to computer scoring logic