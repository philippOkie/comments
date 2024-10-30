import Comment from "./components/Comment";
import CommentForm from "./components/CommentForm";

import "./App.css";

const commentsData = [
  {
    username: "Antony",
    date: "22.05.22 at 22:30",
    text: "I think, therefore I am",
    avatar:
      "https://gravatar.com/avatar/908cbd77ad573643714bb69ffb3feef8?s=400&d=robohash&r=x",
    replies: [
      {
        username: "Rum_8",
        date: "22.05.22 at 22:43",
        text: "you know nun",
        avatar:
          "https://gravatar.com/avatar/344181407873dafec140e5d32e1a16ee?s=400&d=robohash&r=x",
      },
      {
        username: "master_of_none",
        date: "22.05.22 at 22:47",
        text: "doobie doobie doo",
        avatar:
          "https://gravatar.com/avatar/f4b1887dff08b78dd7e5156b089bd86f?s=400&d=robohash&r=x",
        replies: [
          {
            username: "party_maker_228",
            date: "22.05.22 at 22:53",
            text: "woobie wabi boo",
            avatar:
              "https://gravatar.com/avatar/49cbdd392cf72ee38ad0b8cef9d2d8d6?s=400&d=robohash&r=x",
          },
          {
            username: "mrBoombastic",
            date: "22.05.22 at 23:43",
            text: "hell yeaaaa",
            avatar:
              "https://robohash.org/278bd6cddfd4080d1ec905cb56a5b3f9?set=set4&bgset=&size=400x400",
          },
        ],
      },
    ],
  },
  {
    username: "Antony",
    date: "22.05.22 at 22:30",
    text: "I think, therefore I am",
    avatar:
      "https://gravatar.com/avatar/908cbd77ad573643714bb69ffb3feef8?s=400&d=robohash&r=x",
    replies: [
      {
        username: "Rum_8",
        date: "22.05.22 at 22:43",
        text: "you know nun",
        avatar:
          "https://gravatar.com/avatar/344181407873dafec140e5d32e1a16ee?s=400&d=robohash&r=x",
      },
      {
        username: "master_of_none",
        date: "22.05.22 at 22:47",
        text: "doobie doobie doo",
        avatar:
          "https://gravatar.com/avatar/f4b1887dff08b78dd7e5156b089bd86f?s=400&d=robohash&r=x",
        replies: [
          {
            username: "party_maker_228",
            date: "22.05.22 at 22:53",
            text: "woobie wabi boo",
            avatar:
              "https://gravatar.com/avatar/49cbdd392cf72ee38ad0b8cef9d2d8d6?s=400&d=robohash&r=x",
          },
          {
            username: "mrBoombastic",
            date: "22.05.22 at 23:43",
            text: "hell yeaaaa",
            avatar:
              "https://robohash.org/278bd6cddfd4080d1ec905cb56a5b3f9?set=set4&bgset=&size=400x400",
          },
        ],
      },
    ],
  },
  // Add more dummy data if needed
];

const App = () => (
  <div className="app">
    {commentsData.map((comment, index) => (
      <Comment key={index} {...comment} />
    ))}

    <CommentForm></CommentForm>
  </div>
);

export default App;
