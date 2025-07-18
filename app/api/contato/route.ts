import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, phone, subject, message } = await req.json();

  try {
    await resend.emails.send({
      from: 'Contato Eurobombas <contato@eurobombas.com.br>',
      to: 'raulferreiradesouza@gmail.com',
      subject: subject || 'Nova mensagem de contato',
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><b>Nome:</b> ${name}</p>
        <p><b>E-mail:</b> ${email}</p>
        <p><b>Telefone:</b> ${phone}</p>
        <p><b>Assunto:</b> ${subject}</p>
        <p><b>Mensagem:</b><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
} 