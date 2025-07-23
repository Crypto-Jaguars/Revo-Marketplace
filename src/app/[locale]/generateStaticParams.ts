export async function generateStaticParams(): Promise<{ locale: string }[]> {
  return [{ locale: 'en' }, { locale: 'es' }];
}
