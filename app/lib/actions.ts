// Create Invoiceボタンを押したときに呼び出される処理

'use server';
// ↑server functions can then be imported into Client and Server components

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod'; // Library for validating

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  console.log('🚀 ~ createInvoice ~ CreateInvoice:', CreateInvoice);

  // 請求書ルートに表示されるデータを更新しているため、
  // このキャッシュをクリアして、サーバーへの新しいリクエストをトリガー
  // データベースが更新されると、/dashboard/invoicesパスが再検証され、
  // 新しいデータがサーバーからフェッチされる
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
