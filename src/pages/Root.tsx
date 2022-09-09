import { useRouter } from "../Router";

const Root = () => {
  const { push } = useRouter();

  return (
    <div>
      root
      <button
        onClick={() => {
          push("/about");
        }}
      >
        about
      </button>
    </div>
  );
};

export default Root;
