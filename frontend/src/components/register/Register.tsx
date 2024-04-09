import React, { useState, ChangeEvent, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { AUTH_API_URL } from "../../api/loginAuth";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
  role: string;
  first_name: string;
  surname: string;
  middle_initial: string;
  birthday: string;
  birthplace: string;
  citizenship: string;
  civil_status: string;
  age: number;
  gender: string;
  religion: string;
  program: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // TODO: Change this to false when done testing
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    role: "",
    first_name: "",
    surname: "",
    middle_initial: "",
    birthday: "",
    birthplace: "",
    citizenship: "",
    civil_status: "",
    age: 0,
    gender: "",
    religion: "",
    program: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement; // Cast target to HTMLInputElement
    const finalValue =
      type === "number" && value !== "" ? parseInt(value, 10) : value;
    setFormData({ ...formData, [name]: finalValue });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form", formData);

    try {
      const response = await fetch(AUTH_API_URL + "/register_student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log("Registration successful:", data);
        setIsRegistered(true); // Update the state to show success message
      } else {
        console.error("Registration failed:", data.error);
        // Handle errors
      }
    } catch (error) {
      console.error("Request failed:", error);
      // Handle request errors
    }
  };

  const goToSignIn = () => {
    navigate("/login");
  };
  if (isRegistered) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Confetti />
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Registration Complete!</h2>
          <p>Congratulations on successfully registering.</p>
          <button
            onClick={goToSignIn}
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form
          onSubmit={handleSubmit}
          className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  className="text-gray-600 hover:text-blue-500 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
          </div>

          {/* Role */}
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              name="role"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              {/* Add other roles if necessary */}
            </select>
          </div>

          {/* First Name */}
          <div className="mb-4">
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Surname */}
          <div className="mb-4">
            <label
              htmlFor="surname"
              className="block text-sm font-medium text-gray-700"
            >
              Surname
            </label>
            <input
              type="text"
              name="surname"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>

          {/* Middle Initial */}
          <div className="mb-4">
            <label
              htmlFor="middle_initial"
              className="block text-sm font-medium text-gray-700"
            >
              Middle Initial
            </label>
            <input
              type="text"
              name="middle_initial"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Middle Initial"
              value={formData.middle_initial}
              onChange={handleChange}
              required
            />
          </div>

          {/* Birthday */}
          <div className="mb-4">
            <label
              htmlFor="birthday"
              className="block text-sm font-medium text-gray-700"
            >
              Birthday
            </label>
            <input
              type="date"
              name="birthday"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Birthday"
              value={formData.birthday}
              onChange={handleChange}
              required
            />
          </div>

          {/* Birthplace */}
          <div className="mb-4">
            <label
              htmlFor="birthplace"
              className="block text-sm font-medium text-gray-700"
            >
              Birthplace
            </label>
            <input
              type="text"
              name="birthplace"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Birthplace"
              value={formData.birthplace}
              onChange={handleChange}
              required
            />
          </div>

          {/* Citizenship */}
          <div className="mb-4">
            <label
              htmlFor="citizenship"
              className="block text-sm font-medium text-gray-700"
            >
              Citizenship
            </label>
            <input
              type="text"
              name="citizenship"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Citizenship"
              value={formData.citizenship}
              onChange={handleChange}
              required
            />
          </div>

          {/* Civil Status */}
          <div className="mb-4">
            <label
              htmlFor="civil_status"
              className="block text-sm font-medium text-gray-700"
            >
              Civil Status
            </label>
            <select
              name="civil_status"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.civil_status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              {/* Add other civil status options if needed */}
            </select>
          </div>

          {/* Age */}
          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              name="age"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Age"
              value={formData.age === 0 ? "" : formData.age}
              onChange={handleChange}
              required
            />
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              name="gender"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              {/* Add other gender options if necessary */}
            </select>
          </div>

          {/* Religion */}
          <div className="mb-4">
            <label
              htmlFor="religion"
              className="block text-sm font-medium text-gray-700"
            >
              Religion
            </label>
            <input
              type="text"
              name="religion"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Religion"
              value={formData.religion}
              onChange={handleChange}
              required
            />
          </div>

          {/* Program */}
          <div className="mb-4">
            <label
              htmlFor="program"
              className="block text-sm font-medium text-gray-700"
            >
              Program
            </label>
            <input
              type="text"
              name="program"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Program"
              value={formData.program}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
