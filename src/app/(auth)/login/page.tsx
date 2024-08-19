"use client";
import Image from "next/image";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
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
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { useLoginMutation } from "@/redux/queries/auth/authApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [login, { data, error, isSuccess }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Login  successful";
      toast.success(message);
      redirect("/account/address");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        console.log("errorData", errorData)
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);
  const loginSchema = z.object({
    username: z.string().nonempty(),
    password: z.string().min(6, "Password must be atleast 6 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: FieldValues) => {
    const { username, password } = data;
    await login(data);
  };
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
          Login with password.
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              width: 500,
              maxWidth: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
            gap={5}
          >
            <TextField
              fullWidth
              label="Username"
              id="username"
              margin="dense"
              {...register("username")}
              name="username"
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
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
                {...register("password")}
                name="password"
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              items: "center",
              justifyContent: "end",
            }}
          >
            <Link href="/forgot-password">
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{
                  color: "#DD3131",
                  fontWeight: "semibold",
                  borderBottom: "1px solid #DD3131",
                }}
              >
                Forgot Password
              </Typography>
            </Link>
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
              type="submit"
            >
             {isSubmitting ? "submitting" : "Login"}
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
              New to Samaki?{" "}
              <Link href="/register" className="text-[#DD3131]">
                Register
              </Link>
            </Typography>
          </Box>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
