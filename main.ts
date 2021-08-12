let GAME_RUNNING = 0
let SPACE_SHIP: game.LedSprite = null
let COUNTDOWN = 0
let SCORE = 0
let SPEED = 0
let ASTEROID: game.LedSprite = null
input.onButtonPressed(Button.A, function () {
    if (GAME_RUNNING == 1) {
        SPACE_SHIP.change(LedSpriteProperty.X, -1)
    }
})
input.onButtonPressed(Button.B, function () {
    if (GAME_RUNNING == 1) {
        SPACE_SHIP.change(LedSpriteProperty.X, 1)
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.pause(200)
    COUNTDOWN = 5
    while (COUNTDOWN >= 1) {
        basic.showString("" + (COUNTDOWN))
        COUNTDOWN += -1
    }
    GAME_RUNNING = 1
    SCORE = 0
    SPACE_SHIP = game.createSprite(2, 4)
    SPEED = 500
    ASTEROID = game.createSprite(randint(0, 4), 0)
    while (GAME_RUNNING == 1) {
        ASTEROID.set(LedSpriteProperty.Y, 0)
        ASTEROID.set(LedSpriteProperty.X, randint(0, 4))
        for (let index = 0; index <= 3; index++) {
            basic.pause(SPEED)
            ASTEROID.change(LedSpriteProperty.Y, 1)
        }
        if (SPACE_SHIP.isTouching(ASTEROID)) {
            GAME_RUNNING = 0
            ASTEROID.delete()
            SPACE_SHIP.delete()
            basic.showString("" + (SCORE))
            basic.pause(5000)
        } else {
            SCORE += 1
            if (SPEED <= 200) {
                SPEED += -5
            } else if (SPEED <= 100) {
                SPEED += -1
            } else {
                SPEED += -10
            }
        }
    }
})
