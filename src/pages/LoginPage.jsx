import styles from "../styles/LoginPage.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
  tel: z.string().min(10, "Telephone must be at least 10 digits"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    // Here you would typically handle authentication logic
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to My App</h1>
      <form className={styles.formCard} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email:
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            className={styles.input}
            placeholder="example@example.com"
            type="email"
            id="email"
            required
          />
        </div>
        {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password:
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            className={styles.input}
            placeholder="Password"
            type="password"
            id="password"
            required
          />
        </div>
        {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password:
          </label>
          <input
            {...register("confirmPassword", { required: "Please confirm your password" })}
            className={styles.input}
            placeholder="Password"
            type="password"
            id="confirmPassword"
            required
          />
        </div>
        {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword.message}</span>}
        <div className={styles.inputGroup}>
          <label htmlFor="tel" className={styles.label}>
            Telephone:
          </label>
          <input
            {...register("tel", { required: "Telephone is required" })}
            className={styles.input}
            placeholder="Telephone"
            type="tel"
            id="tel"
            required
          />
        </div>
        {errors.tel && <span className={styles.errorText}>{errors.tel.message}</span>}
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </form>
    </div>
  );
}
