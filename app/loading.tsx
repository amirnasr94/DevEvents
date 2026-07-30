import Image from "next/image";

export default function loading() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        src="/assets/icons/loading.svg"
        alt="loading"
        width={320}
        height={320}
      />
      <p className="text-2xl text-primary font-semibold">Loding...</p>
    </div>
  );
}
