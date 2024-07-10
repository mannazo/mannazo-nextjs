import Link from "next/link";
import Image from "next/image";

type VOC = {
  avatar: string;
  name: string;
  text: string;
  star: number;
};

const chatData: VOC[] = [
  {
    avatar: "/images/user/user-01.png",
    name: "Devid Heilo",
    text: "This person is not responding  - Ha..",
    star: 3,
  },
  {
    avatar: "/images/user/user-02.png",
    name: "Henry Fisher",
    text: "This person is not responding  - Ha..",
    star: 3,
  },
  {
    avatar: "/images/user/user-04.png",
    name: "Jhon Doe",
    text: "This person is not responding  - Ha..",
    star: 3,
  },
  {
    avatar: "/images/user/user-05.png",
    name: "Jane Doe",
    text: "This person is not responding  - Ha..",
    star: 3,
  },
  {
    avatar: "/images/user/user-01.png",
    name: "Jhon Doe",
    text: "This person is not responding  - Ha..",
    star: 3,
  },
  {
    avatar: "/images/user/user-03.png",
    name: "Jhon Doe",
    text: "How are you?",
    star: 3,
  },
];

const VOCCard = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark ">
      {/*xl:col-span-4*/}
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Voice of Customers
      </h4>

      <div>
        {chatData.map((chat, key) => (
          <Link
            href="/"
            className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              <Image
                width={56}
                height={56}
                src={chat.avatar}
                alt="User"
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {chat.name}
                </h5>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {chat.text}
                  </span>
                </p>
              </div>

              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <span className="text-sm font-medium text-white">
                  {" "}
                  {chat.star}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VOCCard;
