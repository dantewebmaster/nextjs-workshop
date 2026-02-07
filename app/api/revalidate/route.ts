import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// API Route para revalidação on-demand
// Suporta revalidação por tag ou por path

export async function POST(request: NextRequest) {
  try {
    // Pode receber dados via JSON ou FormData
    const contentType = request.headers.get('content-type');
    let body: any;

    if (contentType?.includes('application/json')) {
      body = await request.json();
    } else {
      // FormData (para forms HTML)
      const formData = await request.formData();
      body = {
        tag: formData.get('tag'),
        path: formData.get('path'),
      };
    }

    const { tag, path } = body;

    // Revalidação por tag
    if (tag) {
      revalidateTag(tag, 'default');
      console.log(`✅ Tag revalidada: ${tag}`);

      return NextResponse.json({
        success: true,
        message: `Tag '${tag}' revalidada com sucesso`,
        revalidated: true,
        type: 'tag',
        timestamp: new Date().toISOString(),
      });
    }

    // Revalidação por path
    if (path) {
      revalidatePath(path);
      console.log(`✅ Path revalidado: ${path}`);

      return NextResponse.json({
        success: true,
        message: `Path '${path}' revalidado com sucesso`,
        revalidated: true,
        type: 'path',
        timestamp: new Date().toISOString(),
      });
    }

    // Se não recebeu nem tag nem path
    return NextResponse.json({
      success: false,
      message: 'Forneça "tag" ou "path" para revalidação',
    }, { status: 400 });

  } catch (error) {
    console.error('❌ Erro na revalidação:', error);

    return NextResponse.json({
      success: false,
      message: 'Erro ao revalidar',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    }, { status: 500 });
  }
}

// Também suporta GET para testes rápidos
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const tag = searchParams.get('tag');
  const path = searchParams.get('path');

  try {
    if (tag) {
      revalidateTag(tag, 'default');
      return NextResponse.json({
        success: true,
        message: `Tag '${tag}' revalidada`,
        type: 'tag',
      });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({
        success: true,
        message: `Path '${path}' revalidado`,
        type: 'path',
      });
    }

    return NextResponse.json({
      success: false,
      message: 'Use ?tag=nome ou ?path=/caminho',
    }, { status: 400 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erro',
    }, { status: 500 });
  }
}
