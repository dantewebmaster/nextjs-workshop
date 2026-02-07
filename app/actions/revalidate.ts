// Server Actions para revalidação
'use server';

import { revalidateTag, revalidatePath } from 'next/cache';

export async function revalidateQuotesTag() {
  revalidateTag('quotes', 'default');
  return { success: true, message: 'Quotes revalidados!' };
}

export async function revalidateProductsTag() {
  revalidateTag('products', 'default');
  return { success: true, message: 'Produtos revalidados!' };
}

export async function revalidatePagePath(path: string) {
  revalidatePath(path);
  return { success: true, message: 'Página revalidada!' };
}
