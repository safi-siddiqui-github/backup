import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Images } from "@/lib/lib-images";
import { ClientPropType } from "@/type";
import { CreditCard } from "lucide-react";
import { FaApplePay, FaGooglePay, FaPaypal } from "react-icons/fa";

export default function EventDetailOrderSectionComponent(prop: ClientPropType) {
  //
  if (prop) {
  }
  //
  // const slug = props.slug;
  //
  return (
    <div className="flex flex-col gap-6">
      {/*  */}

      {/*  */}
      <Card>
        {/*  */}

        {/*  */}
        <CardContent>
          {/*  */}

          {/*  */}
          <div className="flex flex-col gap-10">
            {/*  */}

            {/*  */}
            <div className="flex flex-col gap-2 md:flex-row">
              {/*  */}

              {/*  */}
              <div
                className="flex h-32 flex-col rounded bg-cover bg-center md:h-auto md:w-32"
                style={{ backgroundImage: `url(${Images.mock})` }}
              ></div>
              {/*  */}

              {/*  */}
              <div className="flex flex-col gap-1">
                <CardTitle>Nigerian Day in Houston Food Festival</CardTitle>
                <CardDescription>Sun, Oct 5・12:00 pm</CardDescription>
                <p className="text-xl font-medium">$28.72</p>
              </div>
              {/*  */}
            </div>
            {/*  */}

            {/*  */}
            <div className="flex flex-col gap-6">
              {/*  */}

              {/*  */}
              <div className="flex flex-col gap-1">
                {/*  */}

                {/*  */}
                <CardTitle className="text-2xl">Billing Information</CardTitle>
                {/*  */}

                {/*  */}
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <p className="">Log in for a faster experience.</p>
                  <p className="">*Required</p>
                </div>
                {/*  */}

                {/*  */}
              </div>
              {/*  */}

              {/*  */}
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {/*  */}

                {/*  */}
                <Input placeholder="First Name" />
                {/*  */}

                {/*  */}
                <Input placeholder="Last Name" />
                {/*  */}

                {/*  */}
                <Input placeholder="Email Address" />
                {/*  */}

                {/*  */}
                <Input placeholder="Confirm Email" />
                {/*  */}

                {/*  */}
              </div>
              {/*  */}

              {/*  */}
              <div className="flex flex-col gap-4">
                {/*  */}

                {/*  */}
                <Label>
                  <Input
                    type="checkbox"
                    className="size-4"
                  />
                  <span>
                    Keep me updated on more events and news from this event
                    organizer.
                  </span>
                </Label>
                {/*  */}

                {/*  */}
                <Label>
                  <Input
                    type="checkbox"
                    className="size-4"
                  />
                  <span>
                    Keep me updated on more events and news from this event
                    organizer.
                  </span>
                </Label>
                {/*  */}

                {/*  */}
              </div>
              {/*  */}

              {/*  */}
            </div>
            {/*  */}

            {/*  */}
            <div className="flex flex-col gap-6">
              {/*  */}

              {/*  */}
              <CardTitle className="text-2xl">Payment Via</CardTitle>
              {/*  */}

              {/*  */}
              <div className="flex flex-col gap-4">
                {/*  */}

                {/*  */}
                <Card>
                  {/*  */}

                  {/*  */}
                  <CardHeader>
                    {/*  */}
                    <div className="flex items-center gap-2">
                      {/*  */}

                      {/*  */}
                      <CreditCard />
                      {/*  */}

                      {/*  */}
                      <CardTitle>Credit Or Debit Card</CardTitle>
                      {/*  */}

                      {/*  */}
                    </div>
                    {/*  */}
                  </CardHeader>

                  {/*  */}
                  <CardContent>
                    {/*  */}

                    {/*  */}
                    <div className="flex flex-col gap-4">
                      {/*  */}

                      {/*  */}
                      <div className="flex flex-col gap-1">
                        {/*  */}

                        {/*  */}
                        <Label>Card Number</Label>
                        {/*  */}

                        {/*  */}
                        <Input placeholder="4242424242424242" />
                        {/*  */}

                        {/*  */}
                      </div>
                      {/*  */}

                      {/*  */}
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {/*  */}

                        {/*  */}
                        <div className="flex flex-col gap-1">
                          {/*  */}

                          {/*  */}
                          <Label>Expiration Date</Label>
                          {/*  */}

                          {/*  */}
                          <Input placeholder="MM / YY" />
                          {/*  */}

                          {/*  */}
                        </div>
                        {/*  */}

                        {/*  */}
                        <div className="flex flex-col gap-1">
                          {/*  */}

                          {/*  */}
                          <Label>Security Code</Label>
                          {/*  */}

                          {/*  */}
                          <Input placeholder="999" />
                          {/*  */}

                          {/*  */}
                        </div>
                        {/*  */}

                        {/*  */}
                        <div className="flex flex-col gap-1">
                          {/*  */}

                          {/*  */}
                          <Label>Zip Code</Label>
                          {/*  */}

                          {/*  */}
                          <Input placeholder="989898" />
                          {/*  */}

                          {/*  */}
                        </div>
                        {/*  */}

                        {/*  */}
                      </div>
                      {/*  */}

                      {/*  */}
                    </div>
                    {/*  */}

                    {/*  */}
                  </CardContent>
                  {/*  */}

                  {/*  */}
                </Card>
                {/*  */}

                {/*  */}
                <Card>
                  {/*  */}

                  {/*  */}
                  <CardContent>
                    {/*  */}

                    {/*  */}
                    <div className="flex items-center gap-2">
                      {/*  */}

                      {/*  */}
                      <FaApplePay className="size-10" />
                      {/*  */}

                      {/*  */}
                      <p className="">Pay Via Apple</p>
                      {/*  */}

                      {/*  */}
                    </div>
                    {/*  */}

                    {/*  */}
                  </CardContent>
                  {/*  */}

                  {/*  */}
                </Card>
                {/*  */}

                {/*  */}
                <Card>
                  {/*  */}

                  {/*  */}
                  <CardContent>
                    {/*  */}

                    {/*  */}
                    <div className="flex items-center gap-2">
                      {/*  */}

                      {/*  */}
                      <FaGooglePay className="size-10" />
                      {/*  */}

                      {/*  */}
                      <p className="">Pay Via Google</p>
                      {/*  */}

                      {/*  */}
                    </div>
                    {/*  */}

                    {/*  */}
                  </CardContent>
                  {/*  */}

                  {/*  */}
                </Card>
                {/*  */}

                {/*  */}
                <Card>
                  {/*  */}

                  {/*  */}
                  <CardContent>
                    {/*  */}

                    {/*  */}
                    <div className="flex items-center gap-2">
                      {/*  */}

                      {/*  */}
                      <FaPaypal className="size-10" />
                      {/*  */}

                      {/*  */}
                      <p className="">Pay Via Paypal</p>
                      {/*  */}

                      {/*  */}
                    </div>
                    {/*  */}

                    {/*  */}
                  </CardContent>
                  {/*  */}

                  {/*  */}
                </Card>
                {/*  */}

                {/*  */}
              </div>
              {/*  */}

              {/*  */}
              <CardDescription>
                <span>By selecting Place Order, I agree to the </span>
                <span className="font-medium">EventVerse </span>
                <span>Terms of Service</span>
              </CardDescription>
              {/*  */}

              {/*  */}
            </div>
            {/*  */}

            {/*  */}
          </div>
          {/*  */}

          {/*  */}
        </CardContent>
      </Card>

      {/*  */}

      {/*  */}
    </div>
  );
}
