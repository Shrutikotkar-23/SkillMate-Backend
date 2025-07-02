import User from "../models/User.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, skills, bio, profilePicture, portfolio } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User with this email already exists." });
    }

    const user = new User({
      name,
      email,
      password, // Hashed by pre-save hook
      skills: skills || [],
      bio: bio || "",
      profilePicture: profilePicture || "",
      portfolio: portfolio || [],
    });

    await user.save();

    const token = user.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    // res.status(201).json({
    //   message: "User registered successfully.",
    //   token, // ✅ include token for frontend use if needed
    //   userId: user._id, // ✅ helpful in frontend
    //   user: {
    //     id: user._id,
    //     name: user.name,
    //     email: user.email,
    //   },
    // });

    res.status(200).json({
        message: "User logged in successfully.",
        error: false,
        result: true,
        token,             // ✅ include this
        userId: user._id,  // ✅ include this
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
        },
      });

  } catch (error) {
    console.error("Signup Controller Error:", error);
    res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found. Please register first." });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: "User logged in successfully.",
      token,         // ✅ for frontend localStorage
      userId: user._id, // ✅ store for use in portfolio etc.
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    });

  } catch (error) {
    console.error("Signin Controller Error:", error);
    res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};
