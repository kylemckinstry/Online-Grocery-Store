<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <title>Order Confirmed</title>
</head>
<body>
<div class="site-title"><img src="../Assignment1/images/frog1.png" id="kero" class="wiggle" alt="search" width="60" height="60" onclick="showAll()">Kero's Convenience Store</div>

<div class="confirm-email">

    <div class="confirm-email-content">

        <div id="email-message">
            <div class="email-message-item">
            <span>Ribbit! Thank you for your order, <?php echo $_POST["fname"]; ?>!</span>
            </div>
            <div class="email-message-item">
                <span style="color: #9AC73B;">A confirmation email with your order details has been sent to:</span> 
                <span><?php echo $_POST["email"]; ?></span>
            </div>
            <div class="email-message-item">
                <span style="color: #9AC73B;">Order confirmed at:</span>
                <div><span><?php echo $_POST["date"]; ?></span></div>
            </div>
        </div>

        <div class="confirmation-frog">
            <div class="frog-container">
                <img src="../Assignment1/images/frog1.png" alt="frog1">
                <img src="../Assignment1/images/frog2.png" alt="frog2">
            </div>
        </div>
        
        <button type="submit" class="btn btn-confirm" id="btn-thanks" name="Thanks" onclick="location.href='index.html';" >Thank you!</button>

    </div>
</div>

<div id="confirm-email-overlay"></div>
    
</body>
</html>