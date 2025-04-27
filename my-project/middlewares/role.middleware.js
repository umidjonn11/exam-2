export const roleGuard = (...roles) => {
    return async (req, res, next) => {
      try {
        const userRoles = req.customer.role;
  
        console.log("userRoles", userRoles);
        console.log("permission role", roles);
  
        console.log(roles.includes(userRoles));
  
        if (!roles.includes(userRoles)) {
          return res.status(400).send("Your role is not allowed to access this route!");
        }
        next();
      } catch (error) {
        res.status(400).send(error.message);
      }
    };
  };
  