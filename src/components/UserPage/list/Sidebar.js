// ** React Import
import { useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Third Party Components
import Select from "react-select";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from "reactstrap";

// ** Store & Actions

import { useDispatch } from "react-redux";
import { addUser } from "../../../redux/appUsersSlice";

const defaultValues = {
  gmail: "",
  phoneNumber: "",
  password: "",
  firstname: "",
  lastname: "",
  isteacher: "",
  isstudent: "",
};

const checkIsValid = (data) => {
  return Object.entries(data).every(([key, field]) => {
    if (key === "isstudent" || key === "isteacher") {
      return field !== "no-set"; // بررسی مقدار select
    }
    if (typeof field === "object") {
      return field !== null;
    } else if (typeof field === "boolean") {
      return true;
    } else {
      return field.toString().trim().length > 0;
    }
  });
};
const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null);
  //select Option
  const [selectOption, setSelectOption] = useState({
    isTeacher: "",
    isStudent: "",
  });
  // ** Store Vars
  const dispatch = useDispatch();

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // ** Function to handle form submit
  const onSubmit = (data) => {
    setData(data);
    if (checkIsValid(data)) {
      toggleSidebar();
      dispatch(
        addUser({
          gmail: data.gmail,
          isTeacher: selectOption.isTeacher === "true" ? true : false,
          isStudent: selectOption.isStudent === "true" ? true : false,
          password: data.password,
          phoneNumber: data.phoneNumber,
          firstName: data.firstname,
          lastName: data.lastname,
        })
      );
    } else {
      for (const key in data) {
        if (data[key] === null) {
          setError("country", {
            type: "manual",
          });
        }
        if (data[key] !== null && data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, "");
    }
    setSelectOption({ isteacher: "", isStudent: "" });
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="New User"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <Label className="form-label" for="firstname">
            Full Name <span className="text-danger">*</span>
          </Label>
          <Controller
            name="firstname"
            control={control}
            render={({ field }) => (
              <Input
                id="firstname"
                placeholder="John Doe"
                invalid={errors.firstname && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="lastname">
            lastname <span className="text-danger">*</span>
          </Label>
          <Controller
            name="lastname"
            control={control}
            render={({ field }) => (
              <Input
                id="lastname"
                placeholder="johnDoe99"
                invalid={errors.lastname && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="usergmail">
            Gmail <span className="text-danger">*</span>
          </Label>
          <Controller
            name="gmail"
            control={control}
            render={({ field }) => (
              <Input
                type="gmail"
                id="usergmail"
                placeholder="john.doe@example.com"
                invalid={errors.gmail && true}
                {...field}
              />
            )}
          />
        </div>

        <div className="mb-1">
          <Label className="form-label" for="phoneNumber">
            PhoneNumber <span className="text-danger">*</span>
          </Label>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                id="phoneNumber"
                placeholder="(397) 294-5153"
                invalid={errors.phoneNumber && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="password">
            Password <span className="text-danger">*</span>
          </Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                id="password"
                placeholder="password"
                invalid={errors.password && true}
                {...field}
              />
            )}
          />{" "}
          <FormText color="muted">
            You can use letters, numbers & periods
          </FormText>
        </div>

        <div className="mb-1">
          <Label className="form-label" for="isstudent">
            Student <span className="text-danger">*</span>
          </Label>
          <Input
            type="select"
            id="user-role"
            name="isstudent"
            value={selectOption.isStudent}
            onChange={(e) =>
              setSelectOption({ ...selectOption, isStudent: e.target.value })
            }
            invalid={errors.isstudent && true}
          >
            <option value="no-set">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Input>
        </div>
        <div className="mb-1">
          <Label className="form-label" for="isteacher">
            Teacher <span className="text-danger">*</span>
          </Label>
          <Input
            type="select"
            id="select-plan"
            value={selectOption.isTeacher}
            name="isteacher"
            onChange={(e) =>
              setSelectOption({ ...selectOption, isTeacher: e.target.value })
            }
            invalid={errors.isteacher && true}
          >
            <option value="no-set">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Input>
        </div>
        <Button type="submit" className="me-1" color="primary">
          Submit
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
