function getNextPosition(ball, canvasWidth, canvasHeight) {
    var intialLeft = ball.left;
    var initialTop = ball.top;

    position:
    for (row = initialTop; row < (canvasHeight - ball.size); row += 5) {
        for (col = intialLeft; col < (canvasWidth - ball.size); col += 5) {
            if (!isBallThere(col, row, ball.size)) {
                ball.left = col;
                ball.top = row;
                break position;
            }
        }
    }

    return ball;
}

function isBallThere(left, top, ballSize) {
    var newBallRadius = ballSize / 2;
    var ballThere = false;

    gridBalls.some((gridBall, key) => {
        var gridBallRadius = gridBall.size / 2;

        var ballPoint = {
            x: gridBallRadius + gridBall.left,
            y: gridBallRadius + gridBall.top,
        }

        var newBallPoint = {
            x: newBallRadius + left,
            y: newBallRadius + top,
        }

        var a = ballPoint.x - newBallPoint.x;
        var b = ballPoint.y - newBallPoint.y;

        var distance = Math.sqrt(a * a + b * b);

        if (distance < (gridBallRadius + newBallRadius)) {

            ballThere = true;
            return true;
        }
    });

    return ballThere;
}

function ballsGrid(sizes, canvasWidth, canvasHeight) {
    var gridBalls = [];
    let previousBall = null;
    let counter = 0;

    sizes.forEach((ballSize, key) => {
        var ballWidthHeight = Math.min(canvasWidth * (ballSize.size / 100), canvasHeight * (ballSize.size / 100));
        var ballId = 'ball-' + key;

        var ball = {
            id: ballId,
            size: ballWidthHeight,
            left: ballSize.left ? ballSize.left : 0,
            top: ballSize.top ? ballSize.top : 0
        }

        ball = getNextPosition(ball, canvasWidth, canvasHeight);

        gridBalls.push(ball);

        counter++;

        if (counter == 3) {
            counter = 0;
        }
    });

    return gridBalls;
}

function init() {
    var width = document.getElementById('ballCanvas').offsetWidth;
    var height = document.getElementById('ballCanvas').offsetHeight;

    var size1 = 35.9;
    var size2 = 26.8;
    var size3 = 22.4;

    var sizes = [
        {
            size: size2,
            top: 50,
            left: 50
        },
        {
            size: size3,
            top: 0
        },
        {
            size: size2,
            top: 0
        },
        {
            size: size1,
            top: 0
        },
        {
            size: size2,
            top: 0
        },
        {
            size: size1,
            top: 0
        },
        {
            size: size2,
            top: 0
        },
        {
            size: size3,
            top: 0
        },
        {
            size: size2,
            top: 0
        },
        {
            size: size3,
            top: 0
        },
        {
            size: size3,
            top: 0
        },
        {
            size: size3,
            top: 0
        },
        {
            size: size2,
            top: 0
        },
        {
            size: size3,
            top: 0
        },
    ];

    var balls = ballsGrid(sizes, width, height);

    console.log(balls);
}
