import { Alert, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "../store/actions/UserAuth";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Country, State, City } from "country-state-city";

const RegisterPage = () => {
  const { loader } = useSelector((res) => res.userAuthReducer);

  console.log(loader);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const firebase = useFirebase();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      email === "" ||
      password === "" ||
      displayName === "" ||
      selectedCountry.name === "" ||
      (states.length == 0 ? null : selectedState === "") ||
      (cities.length == 0 ? null : selectedCity === "")
    ) {
      const Error = () => {
        return (
          <div>
            Fill all required fields(<span className="text-danger">*</span>)
          </div>
        );
      };
      toast.error(<Error />);
    } else {
      await dispatch(
        setUser(
          email,
          password,
          displayName,
          selectedCountry.name,
          selectedState.name,
          selectedCity,
          profileImage,
          firebase,
          navigate
        )
      )
        .then(() => {
          toast.success("Signed Up Successfully!");
        })
        .catch((error) => {
          toast.error(`${error.message}`);
        });
    }
  };

  const countries = Country.getAllCountries();

  console.log(countries);
  console.log(selectedCountry);
  console.log(states);
  console.log(selectedState);
  console.log(cities);
  console.log(selectedCity);

  const handleCountryChange = (e) => {
    const countryIsoCode = e.target.value;
    const country = countries.find(
      (country) => country.isoCode === countryIsoCode
    );
    setSelectedCountry(country);
    const statesOfCountry = State.getStatesOfCountry(countryIsoCode);
    setStates(statesOfCountry);
    setSelectedState("");
    setSelectedCity("");
    setCities([]);
  };

  const handleStateChange = (e) => {
    const stateIsoCode = e.target.value;
    const state = states.find((state) => state.isoCode === stateIsoCode);
    setSelectedState(state);
    const citiesOfState = City.getCitiesOfState(
      selectedCountry.isoCode,
      stateIsoCode
    );
    console.log(citiesOfState);
    setCities(citiesOfState);
    setSelectedCity("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="d-sm-flex p-0 p-sm-5 justify-content-center sign-up-image">
      <div className="p-5 bg-white bg-opacity-25 signup-bg rounded">
        <h1 className="mb-5 text-center">Sign Up</h1>
        <Form onSubmit={handleSubmit} className="d-grid">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold">
              Email address <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3 relative z-1" controlId="formBasicPassword">
            <Form.Label className="fw-bold">
              Password <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pe-5"
            />
            <span
              className="bg-none password-icon cursor-pointer absolute z-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <VisibilityOff className="text-muted" />
              ) : (
                <Visibility className="text-muted" />
              )}
            </span>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDisplayName">
            <Form.Label className="fw-bold">
              Display Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
              value={displayName}
              type="text"
              placeholder="Enter you name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCountry">
            <Form.Label className="fw-bold">
              Country <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              as="select"
              value={selectedCountry?.isoCode}
              onChange={handleCountryChange}
            >
              <option value="" className="text-muted">
                Select your country
              </option>
              {countries.map((country) => (
                <option key={country?.isoCode} value={country?.isoCode}>
                  {country?.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicState">
            <Form.Label className="fw-bold">
              State/Province{" "}
              <span className={states.length == 0 ? "d-none" : "text-danger"}>
                *
              </span>
              <span
                className={
                  states.length == 0 && selectedCountry
                    ? "text-danger"
                    : "d-none"
                }
              >
                (No State found)
              </span>
            </Form.Label>
            <Form.Select
              as="select"
              value={selectedState?.isoCode}
              onChange={handleStateChange}
              disabled={states.length == 0}
            >
              <option value="" className="text-muted">
                Select your state/province
              </option>
              {states.map((state, id) => (
                <option key={id} value={state?.isoCode}>
                  {state?.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label className="fw-bold">
              City{" "}
              <span className={cities.length == 0 ? "d-none" : "text-danger"}>
                *
              </span>
              <span
                className={
                  cities.length == 0 && states.length == 0 && selectedCountry
                    ? "text-danger"
                    : "d-none"
                }
              >
                (No City found.)
              </span>
            </Form.Label>
            <Form.Select
              as="select"
              value={selectedCity}
              onChange={handleCityChange}
              disabled={cities.length == 0}
            >
              <option value="" className="text-muted">
                Select your city
              </option>
              {cities.map((city, id) => (
                <option key={id} value={city?.name}>
                  {city?.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicProfileImage">
            <Form.Label className="fw-bold">Profile Image</Form.Label>
            <Form.Control
              onChange={(e) => {
                setProfileImage(e.target.files[0]);
              }}
              accept="image/*"
              type="file"
            />
          </Form.Group>

          <Form.Text className="text-center text-white">Already have account? <NavLink to={"/login"} className="text-warning" >Login</NavLink></Form.Text>

          <Button
            variant="warning"
            type="submit"
            className="mx-auto w-auto mt-3"
            disabled={
              email === "" ||
              password === "" ||
              displayName === "" ||
              selectedCountry === "" ||
              (states.length == 0 ? null : selectedState === "") ||
              (cities.length == 0 ? null : selectedCity === "")
            }
          >
            {loader ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {"  Creating Account..."}
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
