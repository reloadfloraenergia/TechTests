export type RegisteredUser = {
  name: string;
  email: string;
};

type CreateRegisteredUserResult =
  | {
      success: true;
      user: RegisteredUser;
    }
  | {
      success: false;
      message: string;
    };

const REGISTERED_USERS_STORAGE_KEY = "flora_registered_users";
const CURRENT_USER_STORAGE_KEY = "flora_user";

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function getRegisteredUsers(): RegisteredUser[] {
  if (!isBrowser()) {
    return [];
  }

  const usersRaw = localStorage.getItem(REGISTERED_USERS_STORAGE_KEY);

  if (!usersRaw) {
    return [];
  }

  try {
    return JSON.parse(usersRaw) as RegisteredUser[];
  } catch {
    return [];
  }
}

export function saveRegisteredUsers(users: RegisteredUser[]) {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(REGISTERED_USERS_STORAGE_KEY, JSON.stringify(users));
}

export function findRegisteredUserByEmail(email: string) {
  const normalizedEmail = normalizeEmail(email);

  return getRegisteredUsers().find(
    (user) => normalizeEmail(user.email) === normalizedEmail
  );
}

export function createRegisteredUser(
  user: RegisteredUser
): CreateRegisteredUserResult {
  const normalizedUser: RegisteredUser = {
    name: user.name.trim(),
    email: normalizeEmail(user.email),
  };

  const users = getRegisteredUsers();

  const userAlreadyExists = users.some(
    (storedUser) => normalizeEmail(storedUser.email) === normalizedUser.email
  );

  if (userAlreadyExists) {
    return {
      success: false,
      message: "Já existe uma conta cadastrada com este e-mail.",
    };
  }

  saveRegisteredUsers([...users, normalizedUser]);

  return {
    success: true,
    user: normalizedUser,
  };
}

export function getCurrentUser(): RegisteredUser | null {
  if (!isBrowser()) {
    return null;
  }

  const userRaw = localStorage.getItem(CURRENT_USER_STORAGE_KEY);

  if (!userRaw) {
    return null;
  }

  try {
    return JSON.parse(userRaw) as RegisteredUser;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: RegisteredUser) {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(CURRENT_USER_STORAGE_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
}