import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <>
      <div className="layout-content">
        <Link to="/admin/user-management">
          <Button type="primary">Manage Users</Button>
        </Link>
      </div>
    </>
  );
}

export default AdminDashboard; 