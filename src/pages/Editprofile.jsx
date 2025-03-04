import React, { useEffect, useState } from 'react'
import Adminnav from './Adminnav';
import { editprofile, getuser } from '../services/allApi';
import { BASE_URL } from '../services/baseurl';
import { toast } from 'react-toastify'

function Editprofile() {
  const [edit, setEdit] = useState({
    name: '',
    age: '',
    address: '',
    email: '',
    password: '',
    mobile: '',
    profile: '',
    _id: '',
  });

  const [item, setItem] = useState({
    name: '',
    age: '',
    address: '',
    email: '',
    password: '',
    mobile: '',
    profile: '',
    _id: '',
  });

  const [preview, setPreview] = useState('');

  console.log(edit);
  console.log(item);

  const get = async (id) => {
    console.log(id);
    const result = await getuser(id);
    console.log(result);
    if (result.status === 200) {
      setEdit(result.data);
      setItem(result.data);
    }
  };

  const update = async (e) => {
    e.preventDefault();
    console.log(item);

    const data = new FormData();
    data.append('name', item.name);
    data.append('age', item.age);
    data.append('address', item.address);
    data.append('email', item.email);
    data.append('password', item.password);
    data.append('mobile', item.mobile);

    // Append profile only if it's a new file (not a string URL)
    if (typeof item.profile !== 'string') {
      data.append('profile', item.profile);
    }

    const headers = {
      'Content-Type': item.profile instanceof File ? 'multipart/form-data' : 'application/json',
    };

    const result = await editprofile(edit._id, data, headers);
    console.log(result);

    if (result.status === 200) {
      toast.success('Profile updated');
      get(result.data._id)
      // setEdit(result.data);
      // setItem(result.data);

    } else {
      toast.error('Update failed');
    }
  };

  useEffect(() => {
    if (item.profile && typeof item.profile !== 'string') {
      setPreview(URL.createObjectURL(item.profile));
    } else {
      setPreview('');
    }
  }, [item.profile]);

  useEffect(() => {
    const id = sessionStorage.getItem('userid');
    console.log(id);
    if (id) {
      get(id);
    }
  }, []);

  return (
    <div style={{ height: '800px' }}>
      <div>
        <Adminnav />
      </div>

      <div className="d-flex justify-content-center align-items-center mt-4">
        <form className="card container" style={{ width: '300px', height: '700px' }}>
          <label htmlFor="profile">
            <input
              type="file"
              name="profile"
              id="profile"
              onChange={(e) => setItem({ ...item, profile: e.target.files[0] })}
              style={{ display: 'none' }}
            />
            <img
              src={preview ? preview : `${BASE_URL}/upload/${edit.profile}`}
              alt="Profile"
              style={{ width: '200px', height: '200px' }}
              className="m-4"
            />
          </label>

          Name:{' '}
          <input
            type="text"
            className="form-control"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
          />
          Age:{' '}
          <input
            type="number"
            className="form-control"
            value={item.age}
            onChange={(e) => setItem({ ...item, age: e.target.value })}
          />
          Address:{' '}
          <input
            type="text"
            className="form-control"
            value={item.address}
            onChange={(e) => setItem({ ...item, address: e.target.value })}
          />
          Email:{' '}
          <input
            type="email"
            className="form-control"
            value={item.email}
            onChange={(e) => setItem({ ...item, email: e.target.value })}
          />
          Password:{' '}
          <input
            type="password"
            className="form-control"
            value={item.password}
            onChange={(e) => setItem({ ...item, password: e.target.value })}
          />
          Mobile:{' '}
          <input
            type="tel"
            className="form-control"
            value={item.mobile}
            onChange={(e) => setItem({ ...item, mobile: e.target.value })}
          />

          <button className="btn btn-secondary form-control mt-3" onClick={update}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Editprofile;