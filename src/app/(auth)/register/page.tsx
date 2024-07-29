"use client";
import Image from "next/image";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React from "react";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { HiOutlineUser } from "react-icons/hi";
import { MdOutlineShoppingCart } from "react-icons/md";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
const RegisterPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center bg-white px-2 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white p-8 ">
        <div className="flex flex-col items-center mb-5">
          {/* <div className="rounded-full overflow-hidden">
            <Image
              src="/assets/image4.jpg"
              height={150}
              width={150}
              alt="logo"
              className="h-[150px] w-[150px] rounded-full"
            /> */}

          {/* </div> */}
          <div className="flex gap-3 items-center mt-4">
            <span className="text-[25px] font-bold text-black uppercase">
              Samaki
            </span>
            <div className="p-2 rounded-full bg-[#DD3131]">
              <MdOutlineShoppingCart color="white" size={20} />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-light mb-4 text-center">
        Fill in the your  details   to create a Samaki account.
        </h2>
        <form>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <TextField fullWidth label="Email" id="email" margin="dense"  />
            <TextField fullWidth label="Phone number" id="Phone number" />
            <TextField fullWidth label="Date of birth" id="dob" />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password"
              
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Box>
         

          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                backgroundColor: "#DD3131",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#DD3131",
                },
              }}
            >
              SIGN UP
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 4,
            }}
          >
            <Typography variant="body1" gutterBottom>
              Already have an account?{" "}
              <Link href="/login" className="text-[#DD3131]">
                Login
              </Link>
            </Typography>
          </Box>
        </form>
      </div>
    </div>
  );
};
export default RegisterPage;
