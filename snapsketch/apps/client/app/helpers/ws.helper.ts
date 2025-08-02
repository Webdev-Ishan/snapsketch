type Shapes =
  | {
      type: "Rectangle";
      width: number;
      height: number;
      x: number;
      y: number;
    }
  | {
      type: "Circle";
      x: number;
      y: number;
      radius: number;
    }
  | {
      type: "Text";
      message: string;
      x: number;
      y: number;
    };
export const creatRectangle = (
  socket: WebSocket | null,
  roomID: string,
  startX: number,
  startY: number,
  width: number,
  height: number
) => {
  const payload = {
    type: "create",
    roomID: roomID,
    message: {
      type: "Rectangle",
      x: startX,
      y: startY,
      width: width,
      height: height,
    },
  };

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    alert("Socket not open, message not sent");
    return;
  }

  socket.send(JSON.stringify(payload));
};

export const creatCircle = (
  socket: WebSocket | null,
  roomID: string,
  startX: number,
  startY: number,
  radius: number
) => {
  const payload = {
    type: "create",
    roomID: roomID,
    message: {
      type: "Circle",
      x: startX,
      y: startY,
      radius: radius,
    },
  };

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    alert("Socket not open, message not sent");
    return;
  }

  socket.send(JSON.stringify(payload));
};

export const createText = (
  socket: WebSocket | null,
  roomID: string,
  message: string | null,
  x: number,
  y: number
) => {
  const payload = {
    type: "create",
    roomID: roomID,
    message: {
      type: "Text",
      x: x,
      y: y,
      message: message,
    },
  };

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    alert("Socket not open, message not sent");
    return;
  }

  socket.send(JSON.stringify(payload));
};

export const convertServerShapeToClient = (shape: Shapes): Shapes => {
  if (shape.type === "Rectangle") {
    return {
      type: "Rectangle",
      x: shape.x,
      y: shape.y,
      width: shape.width,
      height: shape.height,
    };
  } else if (shape.type === "Circle") {
    return {
      type: "Circle",
      x: shape.x, // fallback to x
      y: shape.y, // fallback to y
      radius: shape.radius,
    };
  } else {
    return {
      type: shape.type,
      message: shape.message,
      x: shape.x,
      y: shape.y,
    };
  }
};
