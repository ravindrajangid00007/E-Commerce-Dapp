//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

contract Buyers {
    uint256 public orderId;

    struct Buyer {
        string name;
        string deliveryAdd;
        address payable buyerAddress;
    }

    struct Order {
        uint256 ordId;
        uint256 pid;
        uint256 qnt;
        uint256 amt;
        address payable sellerAddress;
        bool paymentStatus;
    }

    Buyer[] public buyers;

    mapping(address => Order[]) public orderList;

    event BuyerAdded(string name, string deliveryAdd, address buyerAddress);

    event ProductBought(
        uint256 oId,
        uint256 pid,
        uint256 qnt,
        uint256 amt,
        address buyerAddress
    );

    function _isOldBuyer() public view returns (bool) {
        for (uint256 i = 0; i < buyers.length; i++) {
            if (msg.sender == buyers[i].buyerAddress) return true;
        }
        return false;
    }

    modifier onlyNewBuyer() {
        require(!_isOldBuyer());
        _;
    }

    modifier onlyBuyer() {
        require(_isOldBuyer());
        _;
    }

    function addBuyer(string memory _name, string memory _deliveryAdd)
        public
        onlyNewBuyer
    {
        buyers.push(Buyer(_name, _deliveryAdd, payable(msg.sender)));
        emit BuyerAdded(_name, _deliveryAdd, msg.sender);
    }

    function addOrder(
        uint256 _pid,
        uint256 _qnt,
        uint256 _amt,
        address payable sellerAdd
    ) internal {
        orderId++;
        orderList[msg.sender].push(
            Order(orderId, _pid, _qnt, _amt, sellerAdd, false)
        );
        emit ProductBought(orderId, _pid, _qnt, _amt, msg.sender);
    }

    function getBuyerOrders() public view returns (Order[] memory) {
        return orderList[msg.sender];
    }

    function getOrderById(uint256 _oId) public view returns (Order memory) {
        Order[] memory orders = orderList[msg.sender];
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].ordId == _oId) {
                return orders[i];
            }
        }
        Order memory nullOrder = Order(
            0,
            0,
            0,
            0,
            payable(address(0x0)),
            false
        );
        return nullOrder;
    }

    function confirmOrder(uint256 _oId) public {
        Order[] storage orders = orderList[msg.sender];
        for (uint256 i = 0; i < orders.length; i++) {
            if (orders[i].ordId == _oId) {
                orders[i].paymentStatus = true;
                break;
            }
        }
    }

    function getPendingOrderAmt(uint256 _oId) public view returns (uint256) {
        Order memory order = getOrderById(_oId);
        return order.amt;
    }

    function getOrderSellerAddress(uint256 _oId)
        public
        view
        returns (address payable)
    {
        Order memory order = getOrderById(_oId);
        return order.sellerAddress;
    }

    // function getSellerOrders() public view returns (Order[] memory) {
    //     uint256 orderCount = 0;
    //     for (uint256 i = 1; i <= buyerCount; i++) {
    //         Order[] memory orders = orderList[i];
    //         for (uint256 j = 0; j < orders.length; j++) {
    //             if (orders[j].sellerAddress == msg.sender) {
    //                 orderCount++;
    //             }
    //         }
    //     }
    //     Order[] memory sellerOrders = new Order[](orderCount);
    //     uint256 orderCounter = 0;
    //     for (uint256 i = 1; i <= buyerCount; i++) {
    //         Order[] memory orders = orderList[i];
    //         for (uint256 j = 0; j < orders.length; j++) {
    //             if (orders[j].sellerAddress == msg.sender) {
    //                 sellerOrders[orderCounter] = orders[j];
    //                 orderCounter++;
    //                 if (orderCounter == orderCount) {
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    //     return sellerOrders;
    // }
}
