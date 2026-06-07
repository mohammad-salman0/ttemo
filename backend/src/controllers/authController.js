const User =
 require("../models/User");

const Portfolio =
 require("../models/Portfolio");

const bcrypt =
 require("bcryptjs");

const jwt =
 require("jsonwebtoken");


/*
====================================
 EMAIL VALIDATION
====================================
*/

const validateEmail =
 (email) => {

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   .test(email);

};


/*
====================================
 PASSWORD VALIDATION
====================================
*/

const validatePassword =
 (password) => {

  /*
   Minimum 8 chars
   Uppercase
   Lowercase
   Number
   Special char
  */

  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]{8,}$/
   .test(password);

};


/*
====================================
 SIGNUP
====================================
*/

exports.signup =
 async (req, res) => {

  try {

   let {

    name,
    email,
    password,

   } = req.body;


   /*
   ====================================
   TRIM INPUTS
   ====================================
   */

   name =
    name?.trim();

   email =
    email
     ?.trim()
     .toLowerCase();

   password =
    password?.trim();


   /*
   ====================================
   VALIDATE FIELDS
   ====================================
   */

   if (
    !name ||
    !email ||
    !password
   ) {

    return res.status(400).json({

     message:
      "All fields are required",

    });

   }


   /*
   ====================================
   EMAIL VALIDATION
   ====================================
   */

   if (
    !validateEmail(email)
   ) {

    return res.status(400).json({

     message:
      "Invalid email format",

    });

   }


   /*
   ====================================
   PASSWORD VALIDATION
   ====================================
   */

   if (
    !validatePassword(password)
   ) {

    return res.status(400).json({

     message:
      "Password must contain uppercase, lowercase, number, special character and minimum 8 characters",

    });

   }


   /*
   ====================================
   CHECK EXISTING USER
   ====================================
   */

   const existingUser =
    await User.findOne({

     email,

    });


   if (existingUser) {

    return res.status(400).json({

     message:
      "User already exists",

    });

   }


   /*
   ====================================
   HASH PASSWORD
   ====================================
   */

   const hashedPassword =
    await bcrypt.hash(
     password,
     10
    );


   /*
   ====================================
   CREATE USER
   ====================================
   */

   const user =
    await User.create({

     name,
     email,

     password:
      hashedPassword,

    });


   /*
   ====================================
   CREATE EMPTY PORTFOLIO
   ====================================
   */

   await Portfolio.create({

    user:
     user._id,

    balance: 0,

    investedAmount: 0,

    totalProfit: 0,

    holdings: [],

   });


   /*
   ====================================
   RESPONSE
   ====================================
   */

   res.status(201).json({

    message:
     "User registered successfully",

   });

  } catch (error) {

   console.log(
    "SIGNUP ERROR:"
   );

   console.log(error);


   res.status(500).json({

    message:
     "Signup failed",

   });

  }

};


/*
====================================
 LOGIN
====================================
*/

exports.login =
 async (req, res) => {

  try {

   let {

    email,
    password,

   } = req.body;


   /*
   ====================================
   TRIM INPUTS
   ====================================
   */

   email =
    email
     ?.trim()
     .toLowerCase();

   password =
    password?.trim();


   /*
   ====================================
   VALIDATE FIELDS
   ====================================
   */

   if (
    !email ||
    !password
   ) {

    return res.status(400).json({

     message:
      "Email and password are required",

    });

   }


   /*
   ====================================
   FIND USER
   ====================================
   */

   const user =
    await User.findOne({

     email,

    });


   if (!user) {

    return res.status(400).json({

     message:
      "Invalid credentials",

    });

   }


   /*
   ====================================
   COMPARE PASSWORD
   ====================================
   */

   const isMatch =
    await bcrypt.compare(

     password,
     user.password

    );


   if (!isMatch) {

    return res.status(400).json({

     message:
      "Invalid credentials",

    });

   }


   /*
   ====================================
   GENERATE TOKEN
   ====================================
   */

   const token =
    jwt.sign(

     {
      id: user._id,
     },

     process.env.JWT_SECRET,

     {
      expiresIn: "7d",
     }

    );


   /*
   ====================================
   RESPONSE
   ====================================
   */

   res.status(200).json({

    message:
     "Login successful",

    token,

    user: {

     id:
      user._id,

     name:
      user.name,

     email:
      user.email,

    },

   });

  } catch (error) {

   console.log(
    "LOGIN ERROR:"
   );

   console.log(error);


   res.status(500).json({

    message:
     "Login failed",

   });

  }

};