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

  scope: "read:users update:users",
});

const getUserId = async (email) => {
  const response = await auth0.users.getByEmail(email);
  if (!response.length > 0) {
    return undefined;
  }
  return response[0].user_id;
};

router.get("/getAll", 
// checkScopes(["write:admin"]), 
async (req, res) => {
  try {
    const allUsers = await User.findAll();
    console.log(allUsers)
    return res.json(responseMessage(SUCCESS, allUsers));
  } catch (err) {
    const { message } = err;
    console.log(err)
    return res.json(responseMessage(ERROR, message));
  }
});

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
      let data = { roles: ["rol_0MhYgg7pbFmDUIWV"] };
      auth0.users.getByEmail(email, function (err, users) {
        if (err) {
          console.log(err);
        }
        let params = { id: users[0].user_id };
        auth0.assignRolestoUser(params, data, async function (err) {
          if (err) {
            return res
              .status(404)
              .send(
                "No fue posible añadir el rol de admin al usuario, intente nuevamente"
              );
          }
          await User.update({ isAdmin: true }, { where: { email } });
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
      const userId = await getUserId(email);
      let params = { id: userId };
      let data = { roles: ["rol_0MhYgg7pbFmDUIWV"] };
      await auth0.removeRolesFromUser(params, data);
      await User.update({ isAdmin: false }, { where: { email } });
      res.status(202).send("Se elimino el rol de admin al usuario");
    } catch (err) {
      res
        .status(404)
        .send("No fue posible eliminar el rol de admin al usuario");
    }
  }
);

router.get(
  "/delete-user/:email",

  async (req, res) => {
    const { email } = req.params;
    const userId = await getUserId(email);

    try {
      if (!userId) {
        throw new Error("Usuario no encontrado");
      }
      const response = await auth0.deleteUser({ id: userId });
      console.log(response);
      // User deleted.
      return res.status(202).send("Se elimino al usuario correctamente");
    } catch (err) {
      const { message } = err;
      console.log(message);
      return res.json(responseMessage(ERROR, message));
    }
  }
);

router.get(
  "/block-user/:email",

  async (req, res) => {
    const { email } = req.params;
    const userId = await getUserId(email);

    try {
      if (!userId) {
        throw new Error("Usuario no encontrado");
      }
      const response = await auth0.updateUser(
        { id: userId },
        { blocked: true }
      );
      console.log(response);
      // User deleted.
      return res.status(202).send("Se bloqueo al usuario correctamente");
    } catch (err) {
      const { message } = err;
      console.log(message);
      return res.json(responseMessage(ERROR, message));
    }
  }
);
router.get(
  "/unblock-user/:email",

  async (req, res) => {
    const { email } = req.params;
    const userId = await getUserId(email);

    try {
      if (!userId) {
        throw new Error("Usuario no encontrado");
      }
      const response = await auth0.updateUser(
        { id: userId },
        { blocked: false }
      );
      console.log(response);
      // User deleted.
      return res.status(202).send("Se desbloqueo al usuario correctamente");
    } catch (err) {
      const { message } = err;
      console.log(message);
      return res.json(responseMessage(ERROR, message));
    }
  }
);

module.exports = router;
