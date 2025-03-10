export interface User {
  _id: string;
  username: string;
  email: string;
  name: string;
  role: string; // 'user', 'admin', or 'collaborator'
  // Add other user properties as needed
} 