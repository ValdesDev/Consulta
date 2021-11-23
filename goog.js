const { google } = require("googleapis");

const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2("733548891763-e2256ea89e93gg1u6jv1de54h75u56rp.apps.googleusercontent.com","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");



oAuth2Client.setCredentials({refresh_token:"1//04XNlEvk9fYyJCgYIARAAGAQSNwF-L9IrH2Tk85-97c1us1pqyb9TF_LYKJ2TCMEVscWqhit3PApbb5YPIgdaHMpkvl9Urq_1cT0"});


const calendar =google.calendar({version:"v3", auth:oAuth2Client})

const eventStartTime = new Date();
eventStartTime.setDate(eventStartTime.getDay()+2);

const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDay()+2);
eventEndTime.setMinutes(eventEndTime.getMinutes()+45);

eventStartTime.setDate()

const event ={
    summary: "Reunion con Pepe",
    location: "consulta", //Aqui pone direccion
    description:"sesión presencial",
    star:{
        dateTime: eventStartTime,
        timeZone: "America/Denver",
    },
    end: {
        dateTime: eventEndTime,
        timeZone: "America/Denver",
    },
    colorId:1, // google calendar tiene 11 colores especificos eso dice

}