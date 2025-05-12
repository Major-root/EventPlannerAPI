class Html {
  otpVerificationEmail = (otp, firstName) => {
    return `<table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%!important">
        <tbody>
          <tr>
            <td align="center">
              <table style="border:1px solid #eaeaea;border-radius:5px;margin:40px 0" width="600" border="0" cellspacing="0" cellpadding="40">
                <tbody>
                  <tr>
                    <td align="center">
                      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;text-align:left;width:465px">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%!important">
                          <tbody>
                            <tr>
                              <td align="center">
                                <div>
                                  <img src="https://futoictc.com/assets/logo-white-8eb97cf5.svg" width="155" height="65" alt="logo">
                                </div>
                                <h1 style="color:#000;font-size:18px;font-weight:normal;margin:30px 0;padding:0">Email Verification - <b>CEBX EventPlanners</b></h1>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p style="color:#000;font-size:16px;line-height:24px">Hi <b>${firstName}</b>,</p>
                        <p style="color:#000;font-size:16px;line-height:24px">Your One-Time Password (OTP) for verifying your email address is:</p>
                        <div style="text-align:center;margin:20px 0;">
                          <span style="display:inline-block;background-color:#3FBD98;color:#fff;padding:15px 30px;font-size:24px;font-weight:bold;border-radius:5px;letter-spacing:3px;">${otp}</span>
                        </div>
                        <p style="color:#000;font-size:16px;line-height:24px">This OTP is valid for <b>5 minutes</b>. Please do not share this code with anyone.</p>
                        <hr style="border:none;border-top:1px solid #eaeaea;margin:26px 0;width:100%">
                        <p style="color:#666666;font-size:14px;line-height:24px">If you did not request this, please ignore this email. If you have any issues, feel free to contact our support team.</p>
                        <p style="color:#666666;font-size:14px;line-height:24px">Best regards,<br>The CBEX Event Planner group</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>`;
  };

  ticketEmail = (ticketData, receiverName) => {
    return `<table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%!important">
      <tbody>
        <tr>
          <td align="center">
            <table style="border:1px solid #eaeaea;border-radius:5px;margin:40px 0" width="600" border="0" cellspacing="0" cellpadding="40">
              <tbody>
                <tr>
                  <td align="center">
                    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;text-align:left;width:465px">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="width:100%!important">
                        <tbody>
                          <tr>
                            <td align="center">
                              <div>
                                <img src="https://majors3bucket042.s3.us-east-1.amazonaws.com/cbexlogo.jpeg" width="155" height="65" alt="logo">
                              </div>
                              <h1 style="color:#000;font-size:18px;font-weight:normal;margin:30px 0;padding:0">Your Ticket for <b>${ticketData.eventName}</b></h1>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p style="color:#000;font-size:16px;line-height:24px">Hi <b>${receiverName}</b>,</p>
                      <p style="color:#000;font-size:16px;line-height:24px">Thank you for your purchase. Here are your ticket details:</p>

                      <div style="margin:20px 0;padding:20px;border:1px solid #eaeaea;border-radius:5px;background-color:#f9f9f9">
                        <p><strong>Event:</strong> ${ticketData.eventName}</p>
                        <p><strong>Date:</strong> ${ticketData.eventDate}</p>
                        <p><strong>Time:</strong> ${ticketData.eventTime}</p>
                        <p><strong>Venue:</strong> ${ticketData.eventVenue}</p>
                        <p><strong>Location:</strong> ${ticketData.eventLocation}</p>
                        <p><strong>Ticket Type:</strong> ${ticketData.ticketType}</p>
                        <p><strong>Ticket Code:</strong> <span style="color:#3FBD98;font-weight:bold">${ticketData.ticketCode}</span></p>
                      </div>

                      <div style="text-align:center;margin:30px 0;">
                        <img src="${ticketData.ticketQRCode}" alt="QR Code" width="150" height="150" style="border:1px solid #ccc;padding:5px;background:#fff;border-radius:10px;">
                        <p style="font-size:14px;color:#999;margin-top:10px">Scan this code at the event entrance</p>
                      </div>

                      <hr style="border:none;border-top:1px solid #eaeaea;margin:26px 0;width:100%">
                      <p style="color:#666666;font-size:14px;line-height:24px">If you have any questions or need support, feel free to contact our team.</p>
                      <p style="color:#666666;font-size:14px;line-height:24px">See you at the event!<br>The CBEX Event Planner group</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>`;
  };
}

exports.html = new Html();
