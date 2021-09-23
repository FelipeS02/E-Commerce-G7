const welcomeMail = (name, id) => {
  return `<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
        <meta charset="utf-8"> <!-- utf-8 works for most cases -->
        <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
        <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely -->
        <title>Welcome ${name}</title> <!-- The title tag shows in email notifications, like Android 4.4. -->

        <!-- Web Font / @font-face : BEGIN -->
        <!-- NOTE: If web fonts are not required, lines 10 - 27 can be safely removed. -->

        <!-- Desktop Outlook chokes on web font references and defaults to Times New Roman, so we force a safe fallback font. -->
        <!--[if mso]>
            <style>
                * {
                    font-family: Arial, sans-serif !important;
                }
            </style>
        <![endif]-->

        <!-- All other clients get the webfont reference; some will render the font and others will silently fail to the fallbacks. More on that here: http://stylecampaign.com/blog/2015/02/webfont-support-in-email/ -->
        <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,500" rel="stylesheet">
        <!--<![endif]-->

        <!-- Web Font / @font-face : END -->

        <!-- CSS Reset -->
        <style>
            /* What it does: Remove spaces around the email design added by some email clients. */
            /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
            html,
            body {
                margin: 0 auto !important;
                padding: 0 !important;
                height: 100% !important;
                width: 100% !important;
            }

            /* What it does: Stops email clients resizing small text. */
            * {
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }

            /* What it does: Centers email on Android 4.4 */
            div[style*="margin: 16px 0"] {
                margin: 0 !important;
            }

            /* What it does: Stops Outlook from adding extra spacing to tables. */
            table,
            td {
                mso-table-lspace: 0pt !important;
                mso-table-rspace: 0pt !important;
            }

            /* What it does: Fixes webkit padding issue. Fix for Yahoo mail table alignment bug. Applies table-layout to the first 2 tables then removes for anything nested deeper. */
            table {
                border-spacing: 0 !important;
                border-collapse: collapse !important;
                table-layout: fixed !important;
                margin: 0 auto !important;
            }

            table table table {
                table-layout: auto;
            }

            /* What it does: Uses a better rendering method when resizing images in IE. */
            img {
                -ms-interpolation-mode: bicubic;
            }

            /* What it does: A work-around for email clients meddling in triggered links. */
            *[x-apple-data-detectors],
            /* iOS */
            .x-gmail-data-detectors,
            /* Gmail */
            .x-gmail-data-detectors *,
            .aBn {
                border-bottom: 0 !important;
                cursor: default !important;
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }

            /* What it does: Prevents Gmail from displaying an download button on large, non-linked images. */
            .a6S {
                display: none !important;
                opacity: 0.01 !important;
            }

            /* If the above doesn't work, add a .g-img class to any image in question. */
            img.g-img+div {
                display: none !important;
            }

            /* What it does: Prevents underlining the button text in Windows 10 */
            .button-link {
                text-decoration: none !important;
            }

            /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
            /* Create one of these media queries for each additional viewport size you'd like to fix */
            /* Thanks to Eric Lepetit @ericlepetitsf) for help troubleshooting */
            @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {

                /* iPhone 6 and 6+ */
                .email-container {
                    min-width: 375px !important;
                }
            }
        </style>

        <!-- Progressive Enhancements -->
        <style>
            /* What it does: Hover styles for buttons */
            .button-td,
            .button-a {
                transition: all 100ms ease-in;
            }

            .button-td:hover,
            .button-a:hover {
                background: #000000 !important;
                border-color: #000000 !important;
            }

            /* Media Queries */
            @media screen and (max-width: 480px) {

                /* What it does: Forces elements to resize to the full width of their container. Useful for resizing images beyond their max-width. */
                .fluid {
                    width: 100% !important;
                    max-width: 100% !important;
                    height: auto !important;
                    margin-left: auto !important;
                    margin-right: auto !important;
                }

                /* What it does: Forces table cells into full-width rows. */
                .stack-column,
                .stack-column-center {
                    display: block !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    direction: ltr !important;
                }

                /* And center justify these ones. */
                .stack-column-center {
                    text-align: center !important;
                }

                /* What it does: Generic utility class for centering. Useful for images, buttons, and nested tables. */
                .center-on-narrow {
                    text-align: center !important;
                    display: block !important;
                    margin-left: auto !important;
                    margin-right: auto !important;
                    float: none !important;
                }

                table.center-on-narrow {
                    display: inline-block !important;
                }

                /* What it does: Adjust typography on small screens to improve readability */
                .email-container p {
                    font-size: 17px !important;
                    line-height: 22px !important;
                }
            }
        </style>

        <!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->
        <!--[if gte mso 9]>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->

    </head>

    <body width="100%" bgcolor="#F1F1F1" style="margin: 0; mso-line-height-rule: exactly;">
        <center style="width: 100%; background: #F1F1F1; text-align: left;">

            <!-- Visually Hidden Preheader Text : BEGIN -->
            <div
                style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family: sans-serif;">
                Bienvenido, ${name}!
            </div>
            <!-- Visually Hidden Preheader Text : END -->

            <!--
                Set the email width. Defined in two places:
                1. max-width for all clients except Desktop Windows Outlook, allowing the email to squish on narrow but never go wider than 680px.
                2. MSO tags for Desktop Windows Outlook enforce a 680px width.
                Note: The Fluid and Responsive templates have a different width (600px). The hybrid grid is more "fragile", and I've found that 680px is a good width. Change with caution.
            -->
            <div style="max-width: 680px; margin: auto;" class="email-container">
                <!--[if mso]>
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="680" align="center">
                <tr>
                <td>
                <![endif]-->

                <!-- Email Body : BEGIN -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%"
                    style="max-width: 680px;" class="email-container">


                    <!-- HEADER : BEGIN -->
                    <tr>
                        <td bgcolor="#333333">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 30px 40px 30px 40px; text-align: center;">
                                        <img src="https://i.postimg.cc/sDwB6Gvd/logo16x20cm.png" height="90" alt="alt_text"
                                            border="0" ; font-family: sans-serif; font-size: 18px; line-height: 20px; color:
                                            #555555;>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <!-- HEADER : END -->

                    <!-- HERO : BEGIN -->
                    <tr>
                        <!-- Bulletproof Background Images c/o https://backgrounds.cm -->
                        <td background="https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                            bgcolor="#222222" align="center" valign="top"
                            style="text-align: center; background-position: center center !important; border-bottom: 3px solid #555555; background-size: cover !important;">
                            <!--[if gte mso 9]>
                            <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:680px; height:380px; background-position: center center !important;">
                            <v:fill type="tile" src="background.png" color="#222222" />
                            <v:textbox inset="0,0,0,0">
                            <![endif]-->
                            <div>
                                <!--[if mso]>
                                <table role="presentation" border="0" cellspacing="0" cellpadding="0" align="center" width="500">
                                <tr>
                                <td align="center" valign="middle" width="500">
                                <![endif]-->
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center"
                                    width="100%" style="max-width:500px; margin: auto;">

                                    <tr>
                                        <td height="20" style="font-size:20px; line-height:20px;">&nbsp;</td>
                                    </tr>

                                    <tr>
                                        <td align="center" valign="middle">

                                            <table>
                                                <tr>
                                                    <td valign="top" style="text-align: center; padding: 60px 0 10px 20px;">

                                                        <h1
                                                            style="margin: 0; font-family: 'Montserrat', sans-serif;background-color: #495055; font-size: 30px; line-height: 35px;padding: 6px; color: whitesmoke; font-weight: bold;">
                                                            Bienvenido, ${name}! </h1>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top"
                                                        style="text-align: center; padding: 10px 20px 15px 20px; font-family: sans-serif; font-size: 18px; line-height: 20px; color: #ffffff;">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td valign="top" align="center"
                                                        style="text-align: center; padding: 15px 0px 60px 0px;">

                                                        <!-- Button : BEGIN -->
                                                        <center>
                                                            <table role="presentation" align="center" cellspacing="0"
                                                                cellpadding="0" border="0" class="center-on-narrow"
                                                                style="text-align: center;">
                                                                <tr>
                                                                    <td style="border-radius: 50px; background: #0159B7; text-align: center;"
                                                                        class="button-td">
                                                                        <a href="https://e-commerce-g7.vercel.app/user/${id}"
                                                                            style="background: #0159B7; border: 15px solid #0159B7; font-family: 'Montserrat', sans-serif; font-size: 14px; line-height: 1.1; text-align: center; text-decoration: none; display: block; border-radius: 50px; font-weight: bold;"
                                                                            class="button-a">
                                                                            <span style="color:#ffffff;"
                                                                                class="button-link">&nbsp;&nbsp;&nbsp;&nbsp;ACCEDE
                                                                                A TU CUENTA&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </center>
                                                        <!-- Button : END -->

                                                    </td>
                                                </tr>
                                            </table>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td height="20" style="font-size:20px; line-height:20px;">&nbsp;</td>
                                    </tr>

                                </table>
                                <!--[if mso]>
                                </td>
                                </tr>
                                </table>
                                <![endif]-->
                            </div>
                            <!--[if gte mso 9]>
                            </v:textbox>
                            </v:rect>
                            <![endif]-->
                        </td>
                    </tr>
                    <!-- HERO : END -->

                    <!-- INTRO : BEGIN -->
                    <tr>
                        <td bgcolor="#ffffff">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 40px 40px 20px 40px; text-align: left;">
                                        <h1
                                            style="margin: 0; font-family: 'Montserrat', sans-serif; font-size: 20px; line-height: 26px; color: #333333; font-weight: bold;">
                                            CUENTA ACTIVADA CORRECTAMENTE</h1>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="padding: 0px 40px 20px 40px; font-family: sans-serif; font-size: 18px; line-height: 20px; color: #555555; text-align: left; font-weight:bold;">
                                        <p style="margin: 0;">¡Las mejores prendas estan ahora a tu alcanze!</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="padding: 0px 40px 20px 40px; font-family: sans-serif; font-size: 18px; line-height: 20px; color: #555555; text-align: left; font-weight:normal;">
                                        <p style="margin: 0;">Como equipo esperamos que obtengas una experiencia optima al
                                            momento de elegir las mejores prendas del mercado para acaparar las ultimas
                                            tendencias de la moda y comodidad. ¡Esperamos que disfrutes la experiencia
                                            dentro de E-Commerce G7!.</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="padding: 0px 40px 20px 40px; font-family: sans-serif; font-size: 18px; line-height: 20px; color: #555555; text-align: left; font-weight:normal;">
                                        <p style="margin: 0;">Con ♥,</p>
                                    </td>
                                </tr>

                                <tr>
                                    <td align="left" style="padding: 0px 40px 40px 40px;">

                                        <table width="180" align="left">
                                            <tr>
                                                <td width="70">
                                                    <img src="https://i.postimg.cc/KctBNYPx/logosinnombre15x17-5cm.png"
                                                        height="62" width="62" />
                                                </td>
                                                <td width="110">

                                                    <table width="" cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td align="left"
                                                                style="font-family: sans-serif; font-size:14px; line-height:20px; color:#222222; font-weight:bold;"
                                                                class="body-text">
                                                                <p style="font-family: 'Montserrat', sans-serif; font-size:14px; line-height:20px; color:#222222; font-weight:bold; padding:0; margin:0;"
                                                                    class="body-text">WEB FT-15 G7</p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left"
                                                                style="font-family: sans-serif; font-size:14px; line-height:20px; color:#666666;"
                                                                class="body-text">
                                                                <p style="font-family: sans-serif; font-size:14px; line-height:20px; color:#666666; padding:0; margin:0;"
                                                                    class="body-text">Work Team</p>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                </td>
                                            </tr>
                                        </table>

                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>
                    <!-- INTRO : END -->

                    <!-- FOOTER : BEGIN -->
                    <tr>
                        <td bgcolor="#333333">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td
                                        style="padding: 40px 40px 10px 40px; font-family: sans-serif; font-size: 12px; line-height: 18px; color: whitesmoke; text-align: center; font-weight:normal;">
                                        <p style="margin: 0;">3448, La Rioja, Buenos Aires</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        style="padding: 0px 40px 40px 40px; font-family: sans-serif; font-size: 12px; line-height: 18px; color: whitesmoke; text-align: center; font-weight:normal;">
                                        <p style="margin: 0;">Copyright &copy; 2015-2021 <b>E-Commerce G7</b>, All Rights
                                            Reserved.</p>
                                    </td>
                                </tr>

                            </table>
                        </td>
                    </tr>
                    <!-- FOOTER : END -->

                </table>
                <!-- Email Body : END -->

                <!--[if mso]>
                </td>
                </tr>
                </table>
                <![endif]-->
            </div>

        </center>
    </body>
    </html>`;
};

module.exports = welcomeMail;
