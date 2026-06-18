import { NextResponse } from "next/server";

type LoginRequest = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as LoginRequest;

  const email = body.email?.trim().toLowerCase();
  const password = body.password?.trim();

  if (!email || !password) {
    return NextResponse.json(
      { message: "E-mail e senha são obrigatórios." },
      { status: 400 }
    );
  }

  if (!email.includes("@") || !email.includes(".")) {
    return NextResponse.json(
      { message: "Informe um e-mail válido." },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { message: "A senha precisa ter pelo menos 6 caracteres." },
      { status: 400 }
    );
  }

  const response = NextResponse.json(
    {
      user: {
        name: email.split("@")[0],
        email,
      },
    },
    { status: 200 }
  );

  response.cookies.set({
    name: "flora_token",
    value: "fake-jwt-token",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}