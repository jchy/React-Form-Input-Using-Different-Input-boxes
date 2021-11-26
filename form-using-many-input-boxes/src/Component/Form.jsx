import { useEffect, useRef, useState } from "react";

export default function Form() {
  const [formState, setFormState] = useState({
    name: "",
    gender: "",
    maritalStatus: false,
    image: null
  });
  const [imageSrc, setImageSrc] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const file = imageRef.current.files[0];
    let src = null;
    if (file) {
      src = URL.createObjectURL(file);
    }
    setImageSrc(src);
    return () => {
      URL.revokeObjectURL(src);
    };
  }, [formState.image]);

  const handleImageChange = (e) => {
    try {
      const file = e.target.files[0];
      setFormState({
        ...formState,
        image: file
      });
    } catch (err) {}
    // base-64
  };

  const handleFormUpdate = (e) => {
    let { name, value, type, checked } = e.target;
    // compute final value, is it value / checked
    const val = type === "checkbox" ? checked : value;
    setFormState({
      ...formState,
      [name]: val
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };
  console.log(imageRef);
  return (
    <form onSubmit={handleSubmit}>
      <div className="name">
        <label>Name : </label>
        <input
          onChange={handleFormUpdate}
          value={formState.name}
          placeholder="...Enter Name"
          type="text"
          name="name"
          className="input-box1"
        />
      </div>
      <div className="name">
        <label>Gender : </label>
        <select
          value={formState.gender}
          onChange={handleFormUpdate}
          name="gender"
          className="input-box1"
        >
          <option value="" key="1">
            Select a Gender
          </option>
          <option value="M" key="male">
            M
          </option>
          <option value="F" key="female">
            F
          </option>
        </select>
      </div>
      <div className="name">
        <label>Marital status : </label>
        <input
          checked={formState.maritalStatus}
          onChange={handleFormUpdate}
          name="maritalStatus"
          type="checkbox"
        //   className="input-box1"
        />
      </div>
      <div className="name">
        <label>Profile Picture : </label>
        <input
          multiple
          onChange={handleImageChange}
          ref={imageRef}
          type="file"
          className="input-box1"
        />
        {imageSrc && <img src={imageSrc} alt="profile" />}
      </div>
    </form>
  );
}
