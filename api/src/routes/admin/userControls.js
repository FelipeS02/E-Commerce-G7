const { Router, response } = require("express");
const { User } = require("../../db");
const router = Router();
const { AUTH0_DOMAIN, AUTH0_CLIENTID, AUTH0_CLIENTSECRET } = process.env;
const {
  responseMessage,
  statusCodes: { SUCCESS, ERROR },
} = require("../../controller/responseMessages");

const jwtAuthz = require("express-jwt-authz");
const checkScopes = (permissions) => jwtAuthz(permissions);

<<<<<<< HEAD
var ManagementClient = require("auth0").ManagementClient;
var AuthenticationClient = require("auth0").AuthenticationClient;

var auth0 = new ManagementClient({
  domain: "dev-1ik4n80w.us.auth0.com",
  clientId: "Gq8GYRK0GoSXddVzrJrV2gsRPevzwmEG",
  clientSecret:
    "3KJs37MBspryPS_offY-GsWCRkQRWOESPYsqnzGlGM2JhNpYtOL4ULKF_1A4tstS",
  scope: "read:users update:users",
});

var authenticationClient = new AuthenticationClient({
  domain: "dev-1ik4n80w.us.auth0.com",
  clientId: "Gq8GYRK0GoSXddVzrJrV2gsRPevzwmEG",
  clientSecret:
    "3KJs37MBspryPS_offY-GsWCRkQRWOESPYsqnzGlGM2JhNpYtOL4ULKF_1A4tstS",
=======
let ManagementClient = require("auth0").ManagementClient;
let AuthenticationClient = require("auth0").AuthenticationClient;

let auth0 = new ManagementClient({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENTID,
  clientSecret: AUTH0_CLIENTSECRET,
  scope: "read:users update:users",
});

let authenticationClient = new AuthenticationClient({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENTID,
  clientSecret: AUTH0_CLIENTSECRET,
>>>>>>> main
  scope: "read:users update:users",
});

const getUserId = async (email) => {
  const response = await auth0.users.getByEmail(email);
  return response[0].user_id;
};

router.get("/getAll", checkScopes(["write:admin"]), async (req, res) => {
  try {
    const allUsers = await User.findAll();
    return res.json(responseMessage(SUCCESS, allUsers));
  } catch (err) {
    const { message } = err;
    return res.json(responseMessage(ERROR, message));
  }
  // auth0.getUsers(function (err, users) {
  //   if (err) {
  //     // handle error.
  //     console.log(err);
  //   }
  //   res.send(users);
  // });
});
router.get(
  "/reset-password/:email",
  checkScopes(["write:admin"]),
  async (req, res) => {
    const { email } = req.params;
    const userId = await getUserId(email);
    var data = {
      email: email,
      connection: "Username-Password-Authentication",
    };

    authenticationClient.requestChangePasswordEmail(
      data,
      function (err, message) {
        if (err) {
          res.status(404).send(err);
        }
        res
          .status(202)
          .send(
            "Se ha enviado un correo al usuario para resetear su contraseña"
          );
      }
    );
  }
);

router.get(
  "/assign-role/:email",
  checkScopes(["write:admin"]),
  async (req, res) => {
    const { email } = req.params;
    var data = { roles: ["rol_0MhYgg7pbFmDUIWV"] };

    auth0.users.getByEmail(email, function (err, users) {
      if (err) {
        console.log(err);
      }
      console.log(`${users[0].user_id}`);
      var params = { id: users[0].user_id };
      auth0.assignRolestoUser(params, data, function (err) {
        if (err) {
          return res
            .status(404)
            .send(
              "No fue posible añadir el rol de admin al usuario, intente nuevamente"
            );
        }
        res
          .status(202)
          .send("Se ha añadido el rol de admin correctamente al usuario");
      });
    });
  }
);

router.get(
  "/remove-role/:email",
  checkScopes(["write:admin"]),
  async (req, res) => {
    const { email } = req.params;
    const userId = await getUserId(email);
    console.log(userId);
    var params = { id: userId };
    var data = { roles: ["rol_0MhYgg7pbFmDUIWV"] };
    try {
      await auth0.removeRolesFromUser(params, data);
      res.status(202).send("Se elimino el rol de admin al usuario");
    } catch (err) {
      res
        .status(404)
        .send("No fue posible eliminar el rol de admin al usuario");
    }
  }
);

router.get(
  "/reset-password/:email",
  checkScopes(["write:admin"]),
  async (req, res) => {
    try {
      const { email } = req.params;
      const userId = await getUserId(email);
      var data = {
        email: email,
        connection: "Username-Password-Authentication",
      };
      authenticationClient.requestChangePasswordEmail(
        data,
        function (err, message) {
          if (err) {
            res.status(404).send(err);
          }
          return res
            .status(202)
            .json(
              responseMessage(
                SUCCESS,
                "Se ha enviado un correo al email del usuario para renovar su contraseña"
              )
            );
        }
      );
    } catch (err) {
      const { message } = err;
      return res.json(ERROR, message);
    }
  }
);

router.get(
  "/assign-role/:email",
  checkScopes(["write:admin"]),
  async (req, res) => {
    try {
      const { email } = req.params;
      await User.update({ isAdmin: true }, { where: { email } });
      let data = { roles: ["rol_0MhYgg7pbFmDUIWV"] };
      auth0.users.getByEmail(email, function (err, users) {
        if (err) {
          console.log(err);
        }
        let params = { id: users[0].user_id };
        auth0.assignRolestoUser(params, data, function (err) {
          if (err) {
            return res
              .status(404)
              .send(
                "No fue posible añadir el rol de admin al usuario, intente nuevamente"
              );
          }
          res
            .status(202)
            .send("Se ha añadido el rol de admin correctamente al usuario");
        });
      });
    } catch (err) {
      const { message } = err;
      return res.json(responseMessage(ERROR, message));
    }
  }
);

router.get(
  "/remove-role/:email",
  checkScopes(["write:admin"]),
  async (req, res) => {
    try {
      const { email } = req.params;
      await User.update({ isAdmin: false }, { where: { email } });
      const userId = await getUserId(email);
      let params = { id: userId };
      let data = { roles: ["rol_0MhYgg7pbFmDUIWV"] };
      await auth0.removeRolesFromUser(params, data);
      res.status(202).send("Se elimino el rol de admin al usuario");
    } catch (err) {
      res
        .status(404)
        .send("No fue posible eliminar el rol de admin al usuario");
    }
  }
);

module.exports = router;
