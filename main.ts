let GAME_RUNNING = 0
let SPACE_SHIP: game.LedSprite = null
let COUNTDOWN = 0
let SCORE = 0
let SPEED = 0
let PITCH = 0
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
        music.playTone(587, music.beat(BeatFraction.Eighth))
        basic.showString("" + (COUNTDOWN))
        COUNTDOWN += -1
    }
    GAME_RUNNING = 1
    SCORE = 0
    SPACE_SHIP = game.createSprite(2, 4)
    SPEED = 500
    PITCH = 600
    ASTEROID = game.createSprite(randint(0, 4), 0)
    while (GAME_RUNNING == 1) {
        ASTEROID.set(LedSpriteProperty.Y, 0)
        ASTEROID.set(LedSpriteProperty.X, randint(0, 4))
        music.playTone(PITCH, music.beat(BeatFraction.Quarter))
        for (let index = 0; index <= 3; index++) {
            basic.pause(SPEED)
            ASTEROID.change(LedSpriteProperty.Y, 1)
        }
        if (SPACE_SHIP.isTouching(ASTEROID)) {
            GAME_RUNNING = 0
            music.playTone(196, music.beat(BeatFraction.Breve))
            ASTEROID.delete()
            SPACE_SHIP.delete()
            for (let index = 0; index < 3; index++) {
                basic.showString("" + (SCORE))
                basic.pause(1000)
            }
        } else {
            SCORE += 1
            if (SPEED >= 400) {
                SPEED += -20
            } else if (SPEED >= 300) {
                if (PITCH == 600) {
                    PITCH += 100
                }
                SPEED += -20
            } else if (SPEED >= 200) {
                if (PITCH == 700) {
                    PITCH += 100
                }
                SPEED += -10
            } else {
                if (PITCH == 800) {
                    PITCH += 100
                }
                SPEED += -5
            }
        }
    }
})
