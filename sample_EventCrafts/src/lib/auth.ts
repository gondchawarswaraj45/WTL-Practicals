export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'planner' | 'admin';
  phone?: string;
  avatar?: string;
}

const DEFAULT_USERS: AuthUser[] = [
  { id: 'u1', name: 'Aditya Sharma', email: 'aditya.sharma@email.com', role: 'customer' },
  { id: 'u2', name: 'Royal Grand Decorators', email: 'vendor@royalgrand.com', role: 'vendor' },
  { id: 'u3', name: 'Ananya Sharma', email: 'ananya.planner@eventcrafts.com', role: 'planner' },
  { id: 'u4', name: 'Super Admin', email: 'admin@eventcrafts.com', role: 'admin' },
];

export const getRegisteredUsers = (): AuthUser[] => {
  try {
    const data = localStorage.getItem('ec_registered_users');
    return data ? JSON.parse(data) : DEFAULT_USERS;
  } catch {
    return DEFAULT_USERS;
  }
};

export const registerUser = (userData: {
  firstName: string;
  lastName: string;
  email: string;
  role: 'customer' | 'vendor' | 'planner';
  phone?: string;
}): AuthUser => {
  const users = getRegisteredUsers();
  const fullName = `${userData.firstName} ${userData.lastName}`.trim() || 'New User';
  const newUser: AuthUser = {
    id: `u_${Date.now()}`,
    name: fullName,
    email: userData.email,
    role: userData.role,
    phone: userData.phone,
  };

  const existingIdx = users.findIndex((u) => u.email.toLowerCase() === userData.email.toLowerCase());
  if (existingIdx >= 0) {
    users[existingIdx] = newUser;
  } else {
    users.push(newUser);
  }

  localStorage.setItem('ec_registered_users', JSON.stringify(users));
  localStorage.setItem('ec_active_user', JSON.stringify(newUser));
  return newUser;
};

export const loginUser = (email: string, role: 'customer' | 'vendor' | 'planner' | 'admin'): AuthUser => {
  const users = getRegisteredUsers();
  let user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    const namePart = email.split('@')[0].replace(/[\._]/g, ' ');
    const formattedName = namePart
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    user = {
      id: `u_${Date.now()}`,
      name: formattedName || 'Event User',
      email: email,
      role: role,
    };
    users.push(user);
    localStorage.setItem('ec_registered_users', JSON.stringify(users));
  }

  localStorage.setItem('ec_active_user', JSON.stringify(user));
  return user;
};

export const logoutUser = (): void => {
  localStorage.removeItem('ec_active_user');
};

export const getActiveUser = (): AuthUser => {
  try {
    const data = localStorage.getItem('ec_active_user');
    if (data) return JSON.parse(data);
  } catch {
    // fallback
  }
  return DEFAULT_USERS[0];
};
