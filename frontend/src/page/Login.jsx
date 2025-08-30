const Login = () => {
  return (
    <div className="container position-relative vh-100">
      <div className="position-absolute top-50 start-50 translate-middle border p-4 rounded shadow-sm w-25">
        <h4 className="text-center mb-4">Login</h4>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Login
