export async function generateStaticParams(): Promise<{ locale: string }[]> {
  return [{ locale: 'es' }, { locale: 'en' }];
}
