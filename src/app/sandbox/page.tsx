import ButtonLink from '@/components/links/ButtonLink';
import Typography from '@/components/Typography';

export default function Page() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white'>
      <Typography variant='j2' className='mb-4 text-primary-600'>
        Sandbox
      </Typography>
      <div className='flex gap-4 max-w-[90%] md:max-w-3/5 flex-wrap justify-center'>
        <ButtonLink href='/sandbox/buttons'>Buttons</ButtonLink>
        <ButtonLink href='/sandbox/colors'>Colors</ButtonLink>
        <ButtonLink href='/sandbox/forms'>Forms</ButtonLink>
        <ButtonLink href='/sandbox/typography'>Typography</ButtonLink>
        <ButtonLink href='/sandbox/loading'>Loading</ButtonLink>
        <ButtonLink href='/sandbox/table'>Table</ButtonLink>
      </div>
    </div>
  );
}
