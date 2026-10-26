import useAuthHook from "../../hooks/authHook";

const RegisterPage = () => {
  const { register, errors, handleSubmit, navigate, registerUser } =
    useAuthHook();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-indigo-950 via-purple-900 to-pink-800 px-4 py-10 sm:px-6">
      {/* Decorative Background Blobs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-pink-500/30 blur-3xl sm:h-80 sm:w-80" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl sm:h-96 sm:w-96" />

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8 md:p-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-pink-400 to-violet-500 text-3xl font-extrabold text-white shadow-lg shadow-pink-500/30">
            K
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Create Your Account
          </h1>

          <p className="mt-2 text-sm text-purple-100 sm:text-base">
            Join Kanban Board and organize your work.
          </p>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit(registerUser)}
          className="flex flex-col gap-5"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Full Name
            </label>

            <input
              id="name"
              {...register("name", {
                required: "Name is required",
              })}
              type="text"
              placeholder="Enter your name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-purple-200/70 focus:border-pink-300 focus:ring-2 focus:ring-pink-400/40"
            />

            {errors.name && (
              <p className="mt-2 text-sm text-pink-200" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Email Address
            </label>

            <input
              id="email"
              {...register("email", {
                required: "Email is required",
              })}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-purple-200/70 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/40"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-pink-200" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-white"
            >
              Password
            </label>

            <input
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none transition placeholder:text-purple-200/70 focus:border-violet-300 focus:ring-2 focus:ring-violet-400/40"
            />

            {errors.password && (
              <p className="mt-2 text-sm text-pink-200" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 px-4 py-3 font-bold text-white shadow-lg shadow-purple-900/30 transition duration-300 hover:-translate-y-0.5 hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-900 active:translate-y-0"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-7 border-t border-white/15 pt-6 text-center">
          <p className="text-sm text-purple-100">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="ml-1 font-bold text-pink-300 underline-offset-4 transition hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 focus:ring-offset-purple-900 rounded-sm"
            >
              Login
            </button>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-purple-200/70">
          Stay organized. Work smarter. ✨
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
